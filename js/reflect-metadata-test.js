var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "reflect-metadata"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require("reflect-metadata");
    // @Reflect.metadata('name', 'Aaa')
    // class A {
    //   @Reflect.metadata('hello', 'world')
    //   public hello(): string {
    //     return 'hello world'
    //   }
    // }
    // console.log(new A().hello())
    // console.log(A.name)
    // console.log((new A() as any).name);
    // console.log(Reflect.getMetadata('name', A)) // 'A'
    // console.log(Reflect.getMetadata('hello', new A(), 'hello')) // 'world' ?
    let A = class A {
        hello() { }
    };
    __decorate([
        Reflect.metadata('name', 'hello'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], A.prototype, "hello", null);
    A = __decorate([
        Reflect.metadata('name', 'A')
    ], A);
    const objs = [A, new A, A.prototype];
    const res = objs.map(obj => [
        Reflect.getMetadata('name', obj),
        Reflect.getMetadata('name', obj, 'hello'),
        Reflect.getOwnMetadata('name', obj),
        Reflect.getOwnMetadata('name', obj, 'hello')
    ]);
    console.log(res);
    console.log(A);
});
//# sourceMappingURL=reflect-metadata-test.js.map