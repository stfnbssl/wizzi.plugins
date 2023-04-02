/* ObjectTypeIndexer, ObjectTypeIndexer */
function cloneObject(obj: { [key: string]: mixed }) {}

/* TypeCastExpression */
let val = (value: Type);
(2 + 2: number);
(value: 42);     
(value: number); 
(value: string); 

let obj = { prop: (value: Type) };
let arr = ([(value: Type), (value: Type)]: Array<Type>);

class Item<T> {
  prop: T;
  constructor(param: T) {
    this.prop = param;
  }
}

/* FunctionDeclaration, primitive types */
function method(x: number = 2, y: string, z: boolean) {}

/* InterfaceDeclaration */
interface HasProp<T> {
  prop: T;
  method(value: string): number;
}

/* TypeParameter bound, default */
type Item<T: number = 1> = {
  prop: T,
};

/* TypeParameter variance */
type GenericBox<+T> = T;

/* UnionTypeAnnotation */
function method(value: A | B | C) {}
function method(value: string | number) {}

/* IntersectionTypeAnnotation */
function method(value: A & B & C) {}
function method(value: string & number) {}

/* Utility Types */
type Country = $Keys<typeof countries>;
function makeStore(storeClass: Class<Store>) {
  return new storeClass();
}

/* exportKind, importKind */
export type MyObject = { /* ... */ };
export interface MyInterface { /* ... */ };
import type Foo, {MyObject, MyInterface} from './exports';

/* Comments */

/*::
type MyAlias = {
  foo: number,
  bar: boolean,
  baz: string,
};
*/

function method(value /*: MyAlias */) /*: boolean */ {
  return value.bar;
}

/*
function toStringPrimitives(value: number | boolean | string) {
  return String(value);
}
function identity<T>(value: T): T {
  return value;
}
type IdentityWrapper = {
  func<T>(T): T
}

function identity(value) {
  return value;
}

function genericIdentity<T>(value: T): T {
  return value;
}
const good: IdentityWrapper = { func: genericIdentity }; // Works!
*/

/*
export default class FileListPaneButton extends React.PureComponent<Props, void> {}
type Props = {|
  title: string,
  expanded: boolean,
  onClick: Function,
  buttons?: Array<React.Element<any>>,
  children?: React.Element<any>,
  className?: string,
  theme: ThemeName,
|};
*/