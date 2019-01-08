[portalize](../README.md) > [Portalize](../classes/portalize.md)

# Class: Portalize

## Hierarchy

**Portalize**

## Index

### Constructors

* [constructor](portalize.md#constructor)

### Properties

* [module](portalize.md#module)
* [portal](portalize.md#portal)
* [instance](portalize.md#instance)

### Accessors

* [get](portalize.md#get)

### Methods

* [add](portalize.md#add)
* [event](portalize.md#event)
* [get](portalize.md#get-1)
* [ready](portalize.md#ready)
* [requires](portalize.md#requires)
* [rm](portalize.md#rm)
* [set](portalize.md#set)
* [setModuleName](portalize.md#setmodulename)
* [setPortal](portalize.md#setportal)

---

## Constructors

<a id="constructor"></a>

### `<Private>` constructor

⊕ **new Portalize**(): [Portalize](portalize.md)

*Defined in [Portalize.ts:38](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L38)*

**Returns:** [Portalize](portalize.md)

___

## Properties

<a id="module"></a>

### `<Private>` module

**● module**: *`string`*

*Defined in [Portalize.ts:38](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L38)*

___
<a id="portal"></a>

### `<Private>` portal

**● portal**: *`string`*

*Defined in [Portalize.ts:37](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L37)*

___
<a id="instance"></a>

### `<Static>``<Private>` instance

**● instance**: *[Portalize](portalize.md)*

*Defined in [Portalize.ts:36](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L36)*

___

## Accessors

<a id="get"></a>

### `<Static>` get

getget(): [Portalize](portalize.md)

*Defined in [Portalize.ts:46](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L46)*

Static instance getter. Portalize is a singleton.

**Returns:** [Portalize](portalize.md)

___

## Methods

<a id="add"></a>

###  add

▸ **add**<`T`>(file: *`string`*, data: *`T`*, config?: *[CallConfig](../interfaces/callconfig.md)*): `void`

*Defined in [Portalize.ts:86](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L86)*

Adds file. If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module. If `desc` is provided, description will be saved in event, otherwise event will have the end checksum of the file as description. Useful to tag events that will be required in the future.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| file | `string` |  \- |
| data | `T` |  \- |
| `Optional` config | [CallConfig](../interfaces/callconfig.md) |   |

**Returns:** `void`

___
<a id="event"></a>

### `<Private>` event

▸ **event**(file: *`string`*, action: *`string`*, desc: *`string`*): `void`

*Defined in [Portalize.ts:241](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L241)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| file | `string` |
| action | `string` |
| desc | `string` |

**Returns:** `void`

___
<a id="get-1"></a>

###  get

▸ **get**<`T`>(file: *`string`*, config?: *[CallConfig](../interfaces/callconfig.md)*): `T`

*Defined in [Portalize.ts:153](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L153)*

Gets file. If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| file | `string` |  \- |
| `Optional` config | [CallConfig](../interfaces/callconfig.md) |   |

**Returns:** `T`

___
<a id="ready"></a>

### `<Private>` ready

▸ **ready**(): `void`

*Defined in [Portalize.ts:235](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L235)*

**Returns:** `void`

___
<a id="requires"></a>

###  requires

▸ **requires**(requirement: *[Requirement](../interfaces/requirement.md)*): `boolean`

*Defined in [Portalize.ts:211](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L211)*

Check if the given requirements have occured. If `desc` is provided, check if any event has the exact same `desc`. `to` and `from` can be different. `from` defines the module that emits the action, `to` defines the module containing the file. If `to` is not provided, `to` == `from`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| requirement | [Requirement](../interfaces/requirement.md) |   |

**Returns:** `boolean`

___
<a id="rm"></a>

###  rm

▸ **rm**(file: *`string`*, config?: *[CallConfig](../interfaces/callconfig.md)*): `void`

*Defined in [Portalize.ts:182](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L182)*

Removes file. If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module. If `desc` is provided, description will be saved in event, otherwise event will have 'rm' as description. Useful to tag events that will be required in the future.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| file | `string` |  \- |
| `Optional` config | [CallConfig](../interfaces/callconfig.md) |   |

**Returns:** `void`

___
<a id="set"></a>

###  set

▸ **set**<`T`>(file: *`string`*, data: *`T`*, config?: *[CallConfig](../interfaces/callconfig.md)*): `void`

*Defined in [Portalize.ts:122](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L122)*

Sets file. If `config.module` is provided, action occurs on file from given `config.module`, otherwise on file from current module. If `desc` is provided, description will be saved in event, otherwise event will have the end checksum of the file as description. Useful to tag events that will be required in the future.

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| file | `string` |  \- |
| data | `T` |  \- |
| `Optional` config | [CallConfig](../interfaces/callconfig.md) |   |

**Returns:** `void`

___
<a id="setmodulename"></a>

###  setModuleName

▸ **setModuleName**(name: *`string`*): `void`

*Defined in [Portalize.ts:67](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L67)*

Sets current module name. `setPortal` should be called first.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |   |

**Returns:** `void`

___
<a id="setportal"></a>

###  setPortal

▸ **setPortal**(portal: *`string`*): `void`

*Defined in [Portalize.ts:55](https://github.com/mortimr/portalize/blob/master/sources/Portalize.ts#L55)*

Sets current module's portal path. Should be called before `setModuleName`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| portal | `string` |   |

**Returns:** `void`

___

