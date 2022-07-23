/**
 * Union type.
 * 
 * example:
    Obj1 = {prop1: string, prop2: number}
    Obj2 = {prop3: string, prop4: number}

    union: Union<Obj1, Obj2> = {
        prop1: string,
        prop2: number,
        prop3: string,
        prop4: number
    }


 * 
 */

export type Union<T1, T2> = T1 & T2;
