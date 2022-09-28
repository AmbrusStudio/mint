import type { EventFragment, FunctionFragment, Result } from '@ethersproject/abi'
import type { Listener, Provider } from '@ethersproject/providers'
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils
} from 'ethers'

import type {
  OnEvent,
  PromiseOrValue,
  TypedEvent,
  TypedEventFilter,
  TypedListener
} from '../common'

export interface AmbrusStudioSalerInterface extends utils.Interface {
  functions: {
    'DEFAULT_ADMIN_ROLE()': FunctionFragment
    'WITHDRAWER_ROLE()': FunctionFragment
    'basePrice()': FunctionFragment
    'count()': FunctionFragment
    'flashSale()': FunctionFragment
    'flashSaleConfig()': FunctionFragment
    'flashSaleCount()': FunctionFragment
    'flashSalePrice()': FunctionFragment
    'getRoleAdmin(bytes32)': FunctionFragment
    'grantRole(bytes32,address)': FunctionFragment
    'hasRole(bytes32,address)': FunctionFragment
    'isAccountAllowed(address,bytes32,bytes32[])': FunctionFragment
    'nft()': FunctionFragment
    'permitSale(bytes32[])': FunctionFragment
    'permitSaleConfig()': FunctionFragment
    'permitSalePrice()': FunctionFragment
    'publicSaleEnd()': FunctionFragment
    'publicSaleStart()': FunctionFragment
    'renounceRole(bytes32,address)': FunctionFragment
    'revokeRole(bytes32,address)': FunctionFragment
    'setBasePrice(uint256)': FunctionFragment
    'setFlashSaleCount(uint16)': FunctionFragment
    'setFlashSaleDiscount(uint8)': FunctionFragment
    'setFlashSaleTime(uint32,uint32)': FunctionFragment
    'setPermitSaleDiscount(uint8)': FunctionFragment
    'setPermitSaleMerkleRoot(bytes32)': FunctionFragment
    'setPermitSaleTime(uint32,uint32)': FunctionFragment
    'setPublicSaleTime(uint32,uint32)': FunctionFragment
    'setWhitelistSaleDiscount(uint8)': FunctionFragment
    'setWhitelistSaleMerkleRoot(bytes32)': FunctionFragment
    'setWhitelistSaleTime(uint32,uint32)': FunctionFragment
    'soldCount()': FunctionFragment
    'supportsInterface(bytes4)': FunctionFragment
    'whitelistSale(bytes32[])': FunctionFragment
    'whitelistSaleConfig()': FunctionFragment
    'whitelistSalePrice()': FunctionFragment
    'withdraw()': FunctionFragment
  }

  getFunction(
    nameOrSignatureOrTopic:
      | 'DEFAULT_ADMIN_ROLE'
      | 'WITHDRAWER_ROLE'
      | 'basePrice'
      | 'count'
      | 'flashSale'
      | 'flashSaleConfig'
      | 'flashSaleCount'
      | 'flashSalePrice'
      | 'getRoleAdmin'
      | 'grantRole'
      | 'hasRole'
      | 'isAccountAllowed'
      | 'nft'
      | 'permitSale'
      | 'permitSaleConfig'
      | 'permitSalePrice'
      | 'publicSaleEnd'
      | 'publicSaleStart'
      | 'renounceRole'
      | 'revokeRole'
      | 'setBasePrice'
      | 'setFlashSaleCount'
      | 'setFlashSaleDiscount'
      | 'setFlashSaleTime'
      | 'setPermitSaleDiscount'
      | 'setPermitSaleMerkleRoot'
      | 'setPermitSaleTime'
      | 'setPublicSaleTime'
      | 'setWhitelistSaleDiscount'
      | 'setWhitelistSaleMerkleRoot'
      | 'setWhitelistSaleTime'
      | 'soldCount'
      | 'supportsInterface'
      | 'whitelistSale'
      | 'whitelistSaleConfig'
      | 'whitelistSalePrice'
      | 'withdraw'
  ): FunctionFragment

  encodeFunctionData(functionFragment: 'DEFAULT_ADMIN_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'WITHDRAWER_ROLE', values?: undefined): string
  encodeFunctionData(functionFragment: 'basePrice', values?: undefined): string
  encodeFunctionData(functionFragment: 'count', values?: undefined): string
  encodeFunctionData(functionFragment: 'flashSale', values?: undefined): string
  encodeFunctionData(functionFragment: 'flashSaleConfig', values?: undefined): string
  encodeFunctionData(functionFragment: 'flashSaleCount', values?: undefined): string
  encodeFunctionData(functionFragment: 'flashSalePrice', values?: undefined): string
  encodeFunctionData(functionFragment: 'getRoleAdmin', values: [PromiseOrValue<BytesLike>]): string
  encodeFunctionData(
    functionFragment: 'grantRole',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string
  encodeFunctionData(
    functionFragment: 'hasRole',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string
  encodeFunctionData(
    functionFragment: 'isAccountAllowed',
    values: [PromiseOrValue<string>, PromiseOrValue<BytesLike>, PromiseOrValue<BytesLike>[]]
  ): string
  encodeFunctionData(functionFragment: 'nft', values?: undefined): string
  encodeFunctionData(functionFragment: 'permitSale', values: [PromiseOrValue<BytesLike>[]]): string
  encodeFunctionData(functionFragment: 'permitSaleConfig', values?: undefined): string
  encodeFunctionData(functionFragment: 'permitSalePrice', values?: undefined): string
  encodeFunctionData(functionFragment: 'publicSaleEnd', values?: undefined): string
  encodeFunctionData(functionFragment: 'publicSaleStart', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'renounceRole',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string
  encodeFunctionData(
    functionFragment: 'revokeRole',
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string
  encodeFunctionData(
    functionFragment: 'setBasePrice',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setFlashSaleCount',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setFlashSaleDiscount',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setFlashSaleTime',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setPermitSaleDiscount',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setPermitSaleMerkleRoot',
    values: [PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(
    functionFragment: 'setPermitSaleTime',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setPublicSaleTime',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setWhitelistSaleDiscount',
    values: [PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(
    functionFragment: 'setWhitelistSaleMerkleRoot',
    values: [PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(
    functionFragment: 'setWhitelistSaleTime',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string
  encodeFunctionData(functionFragment: 'soldCount', values?: undefined): string
  encodeFunctionData(
    functionFragment: 'supportsInterface',
    values: [PromiseOrValue<BytesLike>]
  ): string
  encodeFunctionData(
    functionFragment: 'whitelistSale',
    values: [PromiseOrValue<BytesLike>[]]
  ): string
  encodeFunctionData(functionFragment: 'whitelistSaleConfig', values?: undefined): string
  encodeFunctionData(functionFragment: 'whitelistSalePrice', values?: undefined): string
  encodeFunctionData(functionFragment: 'withdraw', values?: undefined): string

  decodeFunctionResult(functionFragment: 'DEFAULT_ADMIN_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'WITHDRAWER_ROLE', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'basePrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'count', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'flashSale', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'flashSaleConfig', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'flashSaleCount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'flashSalePrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'getRoleAdmin', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'grantRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'hasRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'isAccountAllowed', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'nft', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'permitSale', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'permitSaleConfig', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'permitSalePrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'publicSaleEnd', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'publicSaleStart', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'renounceRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'revokeRole', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setBasePrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setFlashSaleCount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setFlashSaleDiscount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setFlashSaleTime', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setPermitSaleDiscount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setPermitSaleMerkleRoot', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setPermitSaleTime', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setPublicSaleTime', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setWhitelistSaleDiscount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setWhitelistSaleMerkleRoot', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'setWhitelistSaleTime', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'soldCount', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'supportsInterface', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'whitelistSale', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'whitelistSaleConfig', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'whitelistSalePrice', data: BytesLike): Result
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result

  events: {
    'RoleAdminChanged(bytes32,bytes32,bytes32)': EventFragment
    'RoleGranted(bytes32,address,address)': EventFragment
    'RoleRevoked(bytes32,address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'RoleAdminChanged'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RoleGranted'): EventFragment
  getEvent(nameOrSignatureOrTopic: 'RoleRevoked'): EventFragment
}

export interface RoleAdminChangedEventObject {
  role: string
  previousAdminRole: string
  newAdminRole: string
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>

export type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>

export interface RoleGrantedEventObject {
  role: string
  account: string
  sender: string
}
export type RoleGrantedEvent = TypedEvent<[string, string, string], RoleGrantedEventObject>

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>

export interface RoleRevokedEventObject {
  role: string
  account: string
  sender: string
}
export type RoleRevokedEvent = TypedEvent<[string, string, string], RoleRevokedEventObject>

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>

export interface AmbrusStudioSaler extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  interface: AmbrusStudioSalerInterface

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>
  listeners(eventName?: string): Array<Listener>
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this
  removeAllListeners(eventName?: string): this
  off: OnEvent<this>
  on: OnEvent<this>
  once: OnEvent<this>
  removeListener: OnEvent<this>

  functions: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>

    WITHDRAWER_ROLE(overrides?: CallOverrides): Promise<[string]>

    basePrice(overrides?: CallOverrides): Promise<[BigNumber]>

    count(overrides?: CallOverrides): Promise<[number]>

    flashSale(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    flashSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, number] & {
        start: number
        end: number
        discount: number
        count: number
      }
    >

    flashSaleCount(overrides?: CallOverrides): Promise<[number]>

    flashSalePrice(overrides?: CallOverrides): Promise<[BigNumber]>

    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    isAccountAllowed(
      account: PromiseOrValue<string>,
      merkleRoot: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<[boolean]>

    nft(overrides?: CallOverrides): Promise<[string]>

    permitSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    permitSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, string] & {
        start: number
        end: number
        discount: number
        merkleRoot: string
      }
    >

    permitSalePrice(overrides?: CallOverrides): Promise<[BigNumber]>

    publicSaleEnd(overrides?: CallOverrides): Promise<[number]>

    publicSaleStart(overrides?: CallOverrides): Promise<[number]>

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setBasePrice(
      _basePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setFlashSaleCount(
      _count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setFlashSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setFlashSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setPermitSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setPermitSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setPermitSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setPublicSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setWhitelistSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setWhitelistSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    setWhitelistSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    soldCount(overrides?: CallOverrides): Promise<[number]>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>

    whitelistSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>

    whitelistSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, string] & {
        start: number
        end: number
        discount: number
        merkleRoot: string
      }
    >

    whitelistSalePrice(overrides?: CallOverrides): Promise<[BigNumber]>

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>
  }

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>

  WITHDRAWER_ROLE(overrides?: CallOverrides): Promise<string>

  basePrice(overrides?: CallOverrides): Promise<BigNumber>

  count(overrides?: CallOverrides): Promise<number>

  flashSale(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  flashSaleConfig(overrides?: CallOverrides): Promise<
    [number, number, number, number] & {
      start: number
      end: number
      discount: number
      count: number
    }
  >

  flashSaleCount(overrides?: CallOverrides): Promise<number>

  flashSalePrice(overrides?: CallOverrides): Promise<BigNumber>

  getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>

  grantRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  hasRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>

  isAccountAllowed(
    account: PromiseOrValue<string>,
    merkleRoot: PromiseOrValue<BytesLike>,
    signature: PromiseOrValue<BytesLike>[],
    overrides?: CallOverrides
  ): Promise<boolean>

  nft(overrides?: CallOverrides): Promise<string>

  permitSale(
    signature: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  permitSaleConfig(overrides?: CallOverrides): Promise<
    [number, number, number, string] & {
      start: number
      end: number
      discount: number
      merkleRoot: string
    }
  >

  permitSalePrice(overrides?: CallOverrides): Promise<BigNumber>

  publicSaleEnd(overrides?: CallOverrides): Promise<number>

  publicSaleStart(overrides?: CallOverrides): Promise<number>

  renounceRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  revokeRole(
    role: PromiseOrValue<BytesLike>,
    account: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setBasePrice(
    _basePrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setFlashSaleCount(
    _count: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setFlashSaleDiscount(
    discount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setFlashSaleTime(
    start: PromiseOrValue<BigNumberish>,
    end: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setPermitSaleDiscount(
    discount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setPermitSaleMerkleRoot(
    merkleRoot: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setPermitSaleTime(
    start: PromiseOrValue<BigNumberish>,
    end: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setPublicSaleTime(
    start: PromiseOrValue<BigNumberish>,
    end: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setWhitelistSaleDiscount(
    discount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setWhitelistSaleMerkleRoot(
    merkleRoot: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  setWhitelistSaleTime(
    start: PromiseOrValue<BigNumberish>,
    end: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  soldCount(overrides?: CallOverrides): Promise<number>

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>

  whitelistSale(
    signature: PromiseOrValue<BytesLike>[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>

  whitelistSaleConfig(overrides?: CallOverrides): Promise<
    [number, number, number, string] & {
      start: number
      end: number
      discount: number
      merkleRoot: string
    }
  >

  whitelistSalePrice(overrides?: CallOverrides): Promise<BigNumber>

  withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>

    WITHDRAWER_ROLE(overrides?: CallOverrides): Promise<string>

    basePrice(overrides?: CallOverrides): Promise<BigNumber>

    count(overrides?: CallOverrides): Promise<number>

    flashSale(overrides?: CallOverrides): Promise<void>

    flashSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, number] & {
        start: number
        end: number
        discount: number
        count: number
      }
    >

    flashSaleCount(overrides?: CallOverrides): Promise<number>

    flashSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>

    isAccountAllowed(
      account: PromiseOrValue<string>,
      merkleRoot: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<boolean>

    nft(overrides?: CallOverrides): Promise<string>

    permitSale(signature: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<void>

    permitSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, string] & {
        start: number
        end: number
        discount: number
        merkleRoot: string
      }
    >

    permitSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    publicSaleEnd(overrides?: CallOverrides): Promise<number>

    publicSaleStart(overrides?: CallOverrides): Promise<number>

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>

    setBasePrice(_basePrice: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>

    setFlashSaleCount(
      _count: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setFlashSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setFlashSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setPermitSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setPermitSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>

    setPermitSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setPublicSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setWhitelistSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    setWhitelistSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>

    setWhitelistSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>

    soldCount(overrides?: CallOverrides): Promise<number>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>

    whitelistSale(signature: PromiseOrValue<BytesLike>[], overrides?: CallOverrides): Promise<void>

    whitelistSaleConfig(overrides?: CallOverrides): Promise<
      [number, number, number, string] & {
        start: number
        end: number
        discount: number
        merkleRoot: string
      }
    >

    whitelistSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    withdraw(overrides?: CallOverrides): Promise<void>
  }

  filters: {
    'RoleAdminChanged(bytes32,bytes32,bytes32)'(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter
    RoleAdminChanged(
      role?: PromiseOrValue<BytesLike> | null,
      previousAdminRole?: PromiseOrValue<BytesLike> | null,
      newAdminRole?: PromiseOrValue<BytesLike> | null
    ): RoleAdminChangedEventFilter

    'RoleGranted(bytes32,address,address)'(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter
    RoleGranted(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleGrantedEventFilter

    'RoleRevoked(bytes32,address,address)'(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter
    RoleRevoked(
      role?: PromiseOrValue<BytesLike> | null,
      account?: PromiseOrValue<string> | null,
      sender?: PromiseOrValue<string> | null
    ): RoleRevokedEventFilter
  }

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>

    WITHDRAWER_ROLE(overrides?: CallOverrides): Promise<BigNumber>

    basePrice(overrides?: CallOverrides): Promise<BigNumber>

    count(overrides?: CallOverrides): Promise<BigNumber>

    flashSale(overrides?: PayableOverrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>

    flashSaleConfig(overrides?: CallOverrides): Promise<BigNumber>

    flashSaleCount(overrides?: CallOverrides): Promise<BigNumber>

    flashSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    isAccountAllowed(
      account: PromiseOrValue<string>,
      merkleRoot: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>

    nft(overrides?: CallOverrides): Promise<BigNumber>

    permitSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    permitSaleConfig(overrides?: CallOverrides): Promise<BigNumber>

    permitSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    publicSaleEnd(overrides?: CallOverrides): Promise<BigNumber>

    publicSaleStart(overrides?: CallOverrides): Promise<BigNumber>

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setBasePrice(
      _basePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setFlashSaleCount(
      _count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setFlashSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setFlashSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setPermitSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setPermitSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setPermitSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setPublicSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setWhitelistSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setWhitelistSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    setWhitelistSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    soldCount(overrides?: CallOverrides): Promise<BigNumber>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    whitelistSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>

    whitelistSaleConfig(overrides?: CallOverrides): Promise<BigNumber>

    whitelistSalePrice(overrides?: CallOverrides): Promise<BigNumber>

    withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>
  }

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>

    WITHDRAWER_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>

    basePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>

    count(overrides?: CallOverrides): Promise<PopulatedTransaction>

    flashSale(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    flashSaleConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>

    flashSaleCount(overrides?: CallOverrides): Promise<PopulatedTransaction>

    flashSalePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>

    getRoleAdmin(
      role: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    grantRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    hasRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    isAccountAllowed(
      account: PromiseOrValue<string>,
      merkleRoot: PromiseOrValue<BytesLike>,
      signature: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    nft(overrides?: CallOverrides): Promise<PopulatedTransaction>

    permitSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    permitSaleConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>

    permitSalePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>

    publicSaleEnd(overrides?: CallOverrides): Promise<PopulatedTransaction>

    publicSaleStart(overrides?: CallOverrides): Promise<PopulatedTransaction>

    renounceRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    revokeRole(
      role: PromiseOrValue<BytesLike>,
      account: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setBasePrice(
      _basePrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setFlashSaleCount(
      _count: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setFlashSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setFlashSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setPermitSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setPermitSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setPermitSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setPublicSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setWhitelistSaleDiscount(
      discount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setWhitelistSaleMerkleRoot(
      merkleRoot: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    setWhitelistSaleTime(
      start: PromiseOrValue<BigNumberish>,
      end: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    soldCount(overrides?: CallOverrides): Promise<PopulatedTransaction>

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    whitelistSale(
      signature: PromiseOrValue<BytesLike>[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>

    whitelistSaleConfig(overrides?: CallOverrides): Promise<PopulatedTransaction>

    whitelistSalePrice(overrides?: CallOverrides): Promise<PopulatedTransaction>

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>
  }
}
