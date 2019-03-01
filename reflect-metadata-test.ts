import 'reflect-metadata';

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

@Reflect.metadata('name', 'A')
class A {
  @Reflect.metadata('name', 'hello')
  hello() {}
}

const objs = [A, new A, A.prototype]
const res = objs.map(obj => [
  Reflect.getMetadata('name', obj),
  Reflect.getMetadata('name', obj, 'hello'),
  Reflect.getOwnMetadata('name', obj),
  Reflect.getOwnMetadata('name', obj ,'hello')
])

console.log(res)
console.log(A)
