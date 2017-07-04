/* tslint:disable interface-name max-classes-per-file */

declare module 'ttn' {

  import { EventEmitter } from 'events'

  export namespace manager {
    class HTTP {
      constructor(options: HTTPOptions)

      public getApplication(appId: string): Promise<Application>
      public registerApplication(app: Application): Promise<{}>
      public setApplication(appId: string, app: Application): Promise<{}>
      public deleteApplication(appId: string): Promise<{}>

      public getDevicesForApplication(appId: string): Promise<{devices: Device[]}>

      public getDevice(appId: string, devId: string): Promise<Device>
      public registerDevice(appId: string, device: Device): Promise<{}>
      public setDevice(appId: string, devId: string, device: Device): Promise<{}>
      public deleteDevice(appId: string, devId: string): Promise<{}>
    }

    type HTTPOptions =
      { key: string, region: HandlerRegion } |
      { key: string, base: string } |
      { token: string, region: HandlerRegion } |
      { token: string, base: string }

    // reference: https://www.thethingsnetwork.org/docs/applications/manager/api.html
    export interface Application {
      app_id: string
      converter: string
      decoder: string
      encoder: string
      validator: string
    }

    export interface Device {
      altitude: number
      app_id: string
      description: string
      dev_id: string
      latitude: number
      longitude: number
      lorawan_device: {
        activation_constraints: string;
        app_eui: string;
        app_id: string;
        app_key: string;
        app_s_key: string;
        dev_addr: string;
        dev_eui: string;
        dev_id: string;
        disable_f_cnt_check: boolean;
        f_cnt_down: number;
        f_cnt_up: number;
        last_seen: number;
        nwk_s_key: string;
        uses32_bit_f_cnt: boolean;
      }
    }
  } // /namespace `manager`

  export namespace data {

    class MQTT extends EventEmitter {
      constructor(region: HandlerRegion, appId: string, appAccessKey: string, options?: MQTTOptions)

      public on(message: 'error', handler: (err: Error) => void): this
      public on(message: 'connection', handler: (connack: object) => void): this

      public on(message: 'message',
                handler: (deviceId: string, data: IUplinkMessage) => void): this
      public on(message: 'message', deviceId: string,
                handler: (deviceId: string, data: IUplinkMessage) => void): this
      public on(message: 'message', deviceId: string, field: string,
                handler: (deviceId: string, data: IUplinkMessage) => void): this

      public on(message: 'device',
                handler: (deviceId: string, data: IActivationMessage | IDownlinkMessage) => void): this
      public on(message: 'device', deviceId: string,
                handler: (deviceId: string, data: IActivationMessage | IDownlinkMessage) => void): this
      public on(message: 'device', deviceId: string, event: 'activations' | 'down/scheduled',
                handler: (deviceId: string, data: IActivationMessage | IDownlinkMessage) => void): this
    }

    type MQTTOptions = {
      ca: Buffer
      protocol?: 'mqtts' | 'mqtt'
    }

    // reference: https://www.thethingsnetwork.org/docs/applications/mqtt/api.html
    export interface IUplinkMessage {
      app_id: string
      dev_id: string
      hardware_serial: string
      port: number
      counter: number
      is_retry: boolean
      confirmed: boolean
      payload_raw: string
      payload_fields?: object
      metadata: Metadata
    }

    export interface IActivationMessage {
      app_eui: string
      dev_eui: string
      dev_addr: string
      metadata: Metadata
    }

    export interface IDownlinkMessage {
      port: number
      payload_raw: {
        type: 'Buffer'
        data: number[],
      }
    }

    interface Metadata {
      time: ISODate
      frequency: number
      modulation: 'LORA' | 'FSK'
      data_rate?: string
      bit_rate?: number
      coding_rate: string
      gateways: Gateway[]
      latitude: number
      longitude: number
      altitude: number
    }

    type ISODate = string

    interface Gateway {
      gtw_id: string
      timestamp: number
      time?: ISODate
      channel: number
      rssi: number
      snr: number
      rf_chain: number
      latitude: number
      longitude: number
      altitude: number
    }
  } // /namespace `data`

  type HandlerRegion = 'asia-se' | 'brazil' | 'eu' | 'us-west' | string

} // /module
