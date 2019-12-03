// Type definitions for subleveldown 4.1
// Project: https://github.com/level/subleveldown
// Definitions by: Carson Farmer <https://github.com/carsonfarmer>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import { LevelUp } from 'levelup';
import { ErrorValueCallback, ErrorCallback, AbstractGetOptions } from 'abstract-leveldown';

declare namespace sub {
    interface Options {
        separator?: string;
        open?: ((callback: ErrorCallback) => void);
    }

    type LevelUpClear<V, O> =
        ((callback: ErrorValueCallback<V>) => void) &
        ((options: O, callback: ErrorValueCallback<V>) => void) &
        ((options?: O) => Promise<V>);

    type InferDBClear<DB> =
        DB extends { clear: (options: infer O, callback: ErrorValueCallback<infer V>) => void } ?
        LevelUpClear<V, O> :
        LevelUpClear<any, AbstractGetOptions>;

    interface SubDown<DB, Iterator> extends LevelUp<DB, Iterator> {
        clear: InferDBClear<DB>;
    }
}

declare function sub<DB, Iterator>(db: LevelUp<DB, Iterator>, prefix?: string, opts?: sub.Options | string): sub.SubDown<DB, Iterator>;

export = sub;
