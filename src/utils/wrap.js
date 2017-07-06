// Copyright © 2017 The Things Network
// Use of this source code is governed by the MIT license that can be found in the LICENCE file.


type Resolver = (value : any) => void
type Rejecter = (error : any) => void

export default function (o, fn : Function, ...args) : Promise<any> {
  return new Promise(function (resolve : Resolver, reject : Rejecter) : void {
    fn.call(o, ...args, function (err, res) : void {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

