import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { BigNumberish, Overrides } from 'ethers'
import { Contract, ContractFactory, Signer, utils } from 'ethers'

import type { PromiseOrValue } from '../../common'
import type {
  AmbrusStudioSalerL2,
  AmbrusStudioSalerL2Interface
} from '../../contracts/AmbrusStudioSalerL2'

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_count',
        type: 'uint16'
      },
      {
        internalType: 'uint256',
        name: '_startId',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      }
    ],
    name: 'MintRequested',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'previousAdminRole',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'newAdminRole',
        type: 'bytes32'
      }
    ],
    name: 'RoleAdminChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleGranted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'RoleRevoked',
    type: 'event'
  },
  {
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'WITHDRAWER_ROLE',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'basePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'count',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'flashSaleSoldCount',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      }
    ],
    name: 'getRoleAdmin',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'hasRole',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      },
      {
        internalType: 'bytes32[]',
        name: 'signature',
        type: 'bytes32[]'
      }
    ],
    name: 'isAccountAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32[]',
        name: 'signature',
        type: 'bytes32[]'
      }
    ],
    name: 'isPermitSaleAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'bytes32[]',
        name: 'signature',
        type: 'bytes32[]'
      }
    ],
    name: 'isWhitelistSaleAllowed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'signature',
        type: 'bytes32[]'
      }
    ],
    name: 'permitSale',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'permitSaleConfig',
    outputs: [
      {
        internalType: 'uint32',
        name: 'start',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'end',
        type: 'uint32'
      },
      {
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'permitSaleCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'permitSalePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'role',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_basePrice',
        type: 'uint256'
      }
    ],
    name: 'setBasePrice',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8'
      }
    ],
    name: 'setPermitSaleDiscount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      }
    ],
    name: 'setPermitSaleMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'start',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'end',
        type: 'uint32'
      }
    ],
    name: 'setPermitSaleTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8'
      }
    ],
    name: 'setWhitelistSaleDiscount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      }
    ],
    name: 'setWhitelistSaleMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: 'start',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'end',
        type: 'uint32'
      }
    ],
    name: 'setWhitelistSaleTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'soldCount',
    outputs: [
      {
        internalType: 'uint16',
        name: '',
        type: 'uint16'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'startId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32[]',
        name: 'signature',
        type: 'bytes32[]'
      }
    ],
    name: 'whitelistSale',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'whitelistSaleConfig',
    outputs: [
      {
        internalType: 'uint32',
        name: 'start',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'end',
        type: 'uint32'
      },
      {
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8'
      },
      {
        internalType: 'bytes32',
        name: 'merkleRoot',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'whitelistSaleCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'whitelistSalePrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]

const _bytecode =
  '0x608060405234801561001057600080fd5b506040516200185938038062001859833981016040819052610031916100f8565b6001805461ffff191661ffff84161790556002819055610052600033610059565b505061012d565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166100f4576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556100b33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b6000806040838503121561010b57600080fd5b825161ffff8116811461011d57600080fd5b6020939093015192949293505050565b61171c806200013d6000396000f3fe6080604052600436106101e75760003560e01c806389805bd911610102578063ba0987b711610095578063d547741f11610064578063d547741f14610618578063de4b326214610638578063f29ff18014610658578063fd305aa51461067857600080fd5b8063ba0987b7146105a0578063bba0ed57146105b3578063c1173250146105ed578063c7876ea41461060257600080fd5b8063a5a0adc6116100d1578063a5a0adc61461052d578063ab050bec1461054d578063ac43f5141461056d578063b09f80f31461058d57600080fd5b806389805bd91461049257806391d14854146104bf5780639ddf079414610503578063a217fddf1461051857600080fd5b806339f9c82c1161017a578063656cf91811610149578063656cf918146103b45780636bbf7b5f1461041e57806385f438c11461043e578063881c5eaa1461047257600080fd5b806339f9c82c14610339578063455567de1461035457806351cff8d9146103745780635797db751461039457600080fd5b806329d7e69b116101b657806329d7e69b146102c15780632f2ff15d146102d757806335077edf146102f957806336568abe1461031957600080fd5b806301ffc9a7146101f357806306661abd146102285780630749abcb14610256578063248a9ca31461029157600080fd5b366101ee57005b600080fd5b3480156101ff57600080fd5b5061021361020e3660046112c2565b610699565b60405190151581526020015b60405180910390f35b34801561023457600080fd5b506001546102439061ffff1681565b60405161ffff909116815260200161021f565b34801561026257600080fd5b50610283610271366004611320565b600a6020526000908152604090205481565b60405190815260200161021f565b34801561029d57600080fd5b506102836102ac36600461133b565b60009081526020819052604090206001015490565b3480156102cd57600080fd5b5061028360025481565b3480156102e357600080fd5b506102f76102f2366004611354565b610732565b005b34801561030557600080fd5b506102f7610314366004611394565b61075c565b34801561032557600080fd5b506102f7610334366004611354565b610798565b34801561034557600080fd5b506008546102439061ffff1681565b34801561036057600080fd5b5061021361036f36600461140a565b610829565b34801561038057600080fd5b506102f761038f366004611320565b610844565b3480156103a057600080fd5b506102f76103af36600461133b565b6108a3565b3480156103c057600080fd5b506006546007546103ee9163ffffffff80821692640100000000830490911691600160401b900460ff169084565b6040805163ffffffff958616815294909316602085015260ff90911691830191909152606082015260800161021f565b34801561042a57600080fd5b506102f761043936600461133b565b6108b4565b34801561044a57600080fd5b506102837f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e481565b34801561047e57600080fd5b5061021361048d36600461140a565b6108c5565b34801561049e57600080fd5b506102836104ad366004611320565b60096020526000908152604090205481565b3480156104cb57600080fd5b506102136104da366004611354565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b34801561050f57600080fd5b506102836108d8565b34801561052457600080fd5b50610283600081565b34801561053957600080fd5b506102f7610548366004611394565b610914565b34801561055957600080fd5b506102f761056836600461145d565b610950565b34801561057957600080fd5b50610213610588366004611480565b610981565b6102f761059b3660046114da565b610a0f565b6102f76105ae3660046114da565b610adc565b3480156105bf57600080fd5b506004546005546103ee9163ffffffff80821692640100000000830490911691600160401b900460ff169084565b3480156105f957600080fd5b50610283610ba9565b34801561060e57600080fd5b5061028360035481565b34801561062457600080fd5b506102f7610633366004611354565b610bc9565b34801561064457600080fd5b506102f761065336600461133b565b610bee565b34801561066457600080fd5b506102f761067336600461145d565b610bff565b34801561068457600080fd5b506008546102439062010000900461ffff1681565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061072c57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60008281526020819052604090206001015461074d81610c30565b6107578383610c3d565b505050565b600061076781610c30565b506006805463ffffffff9283166401000000000267ffffffffffffffff199091169290931691909117919091179055565b6001600160a01b038116331461081b5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b6108258282610cdb565b5050565b600061083c846004600101548585610981565b949350505050565b7f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e461086e81610c30565b6040516001600160a01b038316904780156108fc02916000818181858888f19350505050158015610757573d6000803e3d6000fd5b60006108ae81610c30565b50600755565b60006108bf81610c30565b50600555565b600061083c846006600101548585610981565b6004546003546000916064916108f891600160401b900460ff1690611532565b6109029190611549565b60035461090f919061156b565b905090565b600061091f81610c30565b506004805463ffffffff9283166401000000000267ffffffffffffffff199091169290931691909117919091179055565b600061095b81610c30565b506004805460ff909216600160401b0268ff000000000000000019909216919091179055565b6000836000036109935750600061083c565b610a06838380806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250506040516bffffffffffffffffffffffff1960608b901b166020820152889250603401905060405160208183030381529060405280519060200120610d5a565b95945050505050565b33600090815260096020526040902054600211610a6e5760405162461bcd60e51b815260206004820152601660248201527f45786365656473207075726368617365206c696d6974000000000000000000006044820152606401610812565b336000908152600960205260408120805460019290610a8e90849061157e565b90915550506040805160808101825260045463ffffffff80821683526401000000008204166020830152600160401b900460ff16918101919091526005546060820152610825908383610d70565b336000908152600a6020526040902054600211610b3b5760405162461bcd60e51b815260206004820152601660248201527f45786365656473207075726368617365206c696d6974000000000000000000006044820152606401610812565b336000908152600a60205260408120805460019290610b5b90849061157e565b90915550506040805160808101825260065463ffffffff80821683526401000000008204166020830152600160401b900460ff16918101919091526007546060820152610825908383610d70565b6006546003546000916064916108f891600160401b900460ff1690611532565b600082815260208190526040902060010154610be481610c30565b6107578383610cdb565b6000610bf981610c30565b50600355565b6000610c0a81610c30565b506006805460ff909216600160401b0268ff000000000000000019909216919091179055565b610c3a8133610f00565b50565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16610825576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610c973390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1615610825576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600082610d678584610f7e565b14949350505050565b825163ffffffff16421015610dc75760405162461bcd60e51b815260206004820152600e60248201527f53616c65206e6f742073746172740000000000000000000000000000000000006044820152606401610812565b826020015163ffffffff164210610e205760405162461bcd60e51b815260206004820152600e60248201527f53616c652068617320656e6465640000000000000000000000000000000000006044820152606401610812565b610e303384606001518484610981565b610e7c5760405162461bcd60e51b815260206004820152601960248201527f596f75277265206e6f7420616c6c6f77656420746f20627579000000000000006044820152606401610812565b6064836040015160ff16600354610e939190611532565b610e9d9190611549565b600354610eaa919061156b565b3414610ef85760405162461bcd60e51b815260206004820152601d60248201527f53656e742076616c7565206e6f7420657175616c20746f2070726963650000006044820152606401610812565b610757610fcb565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1661082557610f3c816001600160a01b031660146110ab565b610f478360206110ab565b604051602001610f589291906115b5565b60408051601f198184030181529082905262461bcd60e51b825261081291600401611636565b600081815b8451811015610fc357610faf82868381518110610fa257610fa2611669565b6020026020010151611293565b915080610fbb8161167f565b915050610f83565b509392505050565b60015460085461ffff9182169116106110265760405162461bcd60e51b815260206004820152600860248201527f536f6c64206f75740000000000000000000000000000000000000000000000006044820152606401610812565b6008805461ffff1690600061103a83611698565b91906101000a81548161ffff021916908361ffff160217905550507fed7e1cc32737aac2f5c91387879185d74677bc68b69562a9d6dcd77622e8b62d600860009054906101000a900461ffff1661ffff16600254611098919061157e565b60405190815260200160405180910390a1565b606060006110ba836002611532565b6110c590600261157e565b67ffffffffffffffff8111156110dd576110dd6116b9565b6040519080825280601f01601f191660200182016040528015611107576020820181803683370190505b5090507f30000000000000000000000000000000000000000000000000000000000000008160008151811061113e5761113e611669565b60200101906001600160f81b031916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061118957611189611669565b60200101906001600160f81b031916908160001a90535060006111ad846002611532565b6111b890600161157e565b90505b600181111561123d577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106111f9576111f9611669565b1a60f81b82828151811061120f5761120f611669565b60200101906001600160f81b031916908160001a90535060049490941c93611236816116cf565b90506111bb565b50831561128c5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610812565b9392505050565b60008183106112af57600082815260208490526040902061128c565b600083815260208390526040902061128c565b6000602082840312156112d457600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461128c57600080fd5b80356001600160a01b038116811461131b57600080fd5b919050565b60006020828403121561133257600080fd5b61128c82611304565b60006020828403121561134d57600080fd5b5035919050565b6000806040838503121561136757600080fd5b8235915061137760208401611304565b90509250929050565b803563ffffffff8116811461131b57600080fd5b600080604083850312156113a757600080fd5b6113b083611380565b915061137760208401611380565b60008083601f8401126113d057600080fd5b50813567ffffffffffffffff8111156113e857600080fd5b6020830191508360208260051b850101111561140357600080fd5b9250929050565b60008060006040848603121561141f57600080fd5b61142884611304565b9250602084013567ffffffffffffffff81111561144457600080fd5b611450868287016113be565b9497909650939450505050565b60006020828403121561146f57600080fd5b813560ff8116811461128c57600080fd5b6000806000806060858703121561149657600080fd5b61149f85611304565b935060208501359250604085013567ffffffffffffffff8111156114c257600080fd5b6114ce878288016113be565b95989497509550505050565b600080602083850312156114ed57600080fd5b823567ffffffffffffffff81111561150457600080fd5b611510858286016113be565b90969095509350505050565b634e487b7160e01b600052601160045260246000fd5b808202811582820484141761072c5761072c61151c565b60008261156657634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561072c5761072c61151c565b8082018082111561072c5761072c61151c565b60005b838110156115ac578181015183820152602001611594565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516115ed816017850160208801611591565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000601791840191820152835161162a816028840160208801611591565b01602801949350505050565b6020815260008251806020840152611655816040850160208701611591565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b6000600182016116915761169161151c565b5060010190565b600061ffff8083168181036116af576116af61151c565b6001019392505050565b634e487b7160e01b600052604160045260246000fd5b6000816116de576116de61151c565b50600019019056fea264697066735822122041fc19c602d415725cff5f404d6cabeb7f2cf513213b415bb7b9550db8ade1ed64736f6c63430008110033'

type AmbrusStudioSalerL2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>

const isSuperArgs = (
  xs: AmbrusStudioSalerL2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1

export class AmbrusStudioSalerL2__factory extends ContractFactory {
  constructor(...args: AmbrusStudioSalerL2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args)
    } else {
      super(_abi, _bytecode, args[0])
    }
  }

  override deploy(
    _count: PromiseOrValue<BigNumberish>,
    _startId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AmbrusStudioSalerL2> {
    return super.deploy(_count, _startId, overrides || {}) as Promise<AmbrusStudioSalerL2>
  }
  override getDeployTransaction(
    _count: PromiseOrValue<BigNumberish>,
    _startId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_count, _startId, overrides || {})
  }
  override attach(address: string): AmbrusStudioSalerL2 {
    return super.attach(address) as AmbrusStudioSalerL2
  }
  override connect(signer: Signer): AmbrusStudioSalerL2__factory {
    return super.connect(signer) as AmbrusStudioSalerL2__factory
  }

  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): AmbrusStudioSalerL2Interface {
    return new utils.Interface(_abi) as AmbrusStudioSalerL2Interface
  }
  static connect(address: string, signerOrProvider: Signer | Provider): AmbrusStudioSalerL2 {
    return new Contract(address, _abi, signerOrProvider) as AmbrusStudioSalerL2
  }
}
