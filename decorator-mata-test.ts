import 'reflect-metadata';

// 商品服务类
class WareService {
    private _stock: number = 10; // 库存

    get stock(): number {
        return this._stock;
    }

    decreaseStock(): void {
        this._stock--;
    }
}

// 购物车服务类
class CartService {
    private _wareCount: number = 0; // 购物车商品数量

    get wareCount(): number {
        return this._wareCount;
    }

    increaseWareCount(): void {
        this._wareCount++;
    }
}
// 商品组件类
@Injectable
class WareComponent {
    // 构造商品组件，依赖于商品服务和购物车服务
    constructor(private wareService: WareService, private cartService: CartService) {
    }

    // 添加商品的购物车：减少商品库存量，同时增加购物车商品数量
    addToCart(): void {
        this.wareService.decreaseStock();
        this.cartService.increaseWareCount();
        console.log(`已成功添加商品到购物车，目前商品库存：${this.wareService.stock}；购物车商品数量：${this.cartService.wareCount}。`);
    }
}
/* // 创建商品服务、购物车服务和商品组件
let wareService = new WareService();
let cartService = new CartService();
let wareComponent = new WareComponent(wareService, cartService);

// 调用商品组件的addToCart()方法，以添加商品到购物车中
wareComponent.addToCart(); // 输出“已成功添加商品到购物车，目前商品库存：9；购物车商品数量：1。”
wareComponent.addToCart(); // 输出“已成功添加商品到购物车，目前商品库存：8；购物车商品数量：2。” */

// 依赖注入器类
abstract class DependencyInjector {
    /**
     * 获取指定类的对象
     * @param constructor 目标对象的类（的构造函数）
     */
    //泛型方法getService,泛型T,接受一个参数（constructor),类型为function
    static getService<T>(constructor: new (...args: any[]) => T): T {
        // 获取类装饰器Injectable为目标类定义的名为“design:paramtypes”的元数据
        // 即目标类的构造函数的参数的构造函数组成的数组
        let paramtypes: any = Reflect.getMetadata('design:paramtypes', constructor);

        // 如果目标类上没有名为“design:paramtypes”的元数据
        // 那么直接返回通过这个类创建的对象
        if (!paramtypes || !paramtypes.length) {
            return new constructor();
        }

        // 需要传递给目标类的构造函数的参数数组
        let parameters: any[] = [];
        for (let parameterType of paramtypes) {
            // 递归调用当前方法，创建参数，并将参数添加到参数数组中
            let parameter: any = this.getService(parameterType);
            parameters.push(parameter);
        }

        // 使用参数数组构造目标对象，并将它返回给调用方
        return new constructor(...parameters);
    }
}

// 通过reflect-metadata中的Reflect为WareComponent定义名为design:paramtypes
// 、值为[WareService, CartService]的元数据
// Reflect.defineMetadata('design:paramtypes', [WareService, CartService], WareComponent);

// 通过依赖注入器获取商品组件实例，并调用其addToCart()方法
let wareComponent = DependencyInjector.getService(WareComponent);
wareComponent.addToCart();


// 类装饰器，其本质是函数
function Injectable(constructor: new (...args: any[]) => void): void {
}

// 定义并装饰Index类
@Injectable
class Index {
    // 构造依赖于WareComponent实例的Index实例
    constructor(private wareComponent: WareComponent) {
    }

    // 运行以调用WareComponent实例的addToCart()方法
    run(): void {
        this.wareComponent.addToCart();
    }
}

// 通过依赖注入器获取Index实例，并调用它的run()方法
let index = DependencyInjector.getService(Index);
index.run();
