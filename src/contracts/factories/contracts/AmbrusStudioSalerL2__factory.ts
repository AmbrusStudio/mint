import type { Provider, TransactionRequest } from '@ethersproject/providers'
import type { BigNumberish, BytesLike, Overrides } from 'ethers'
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
      },
      {
        internalType: 'uint32',
        name: 's1',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'e1',
        type: 'uint32'
      },
      {
        internalType: 'bytes32',
        name: 'm1',
        type: 'bytes32'
      },
      {
        internalType: 'uint32',
        name: 's2',
        type: 'uint32'
      },
      {
        internalType: 'uint32',
        name: 'e2',
        type: 'uint32'
      },
      {
        internalType: 'bytes32',
        name: 'm2',
        type: 'bytes32'
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
  '0x60806040523480156200001157600080fd5b506040516200194b3803806200194b8339810160408190526200003491620001b5565b6001805461ffff8a1661ffff199091161790556002879055600480546006805463ffffffff89811664010000000090810263ffffffff60201b19838e1668ff00000000ffffffff1997881617680f00000000000000001781169190911790965560058a9055878216029088169390911692909217680a0000000000000000179092161790556007819055620000cb600033620000fa565b620000ec6000736465f1250c9fe162602db83791fc3fb202d70a7b620000fa565b50505050505050506200024b565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000197576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001563390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b805163ffffffff81168114620001b057600080fd5b919050565b600080600080600080600080610100898b031215620001d357600080fd5b885161ffff81168114620001e657600080fd5b60208a01519098509650620001fe60408a016200019b565b95506200020e60608a016200019b565b9450608089015193506200022560a08a016200019b565b92506200023560c08a016200019b565b915060e089015190509295985092959890939650565b6116f0806200025b6000396000f3fe6080604052600436106101dc5760003560e01c8063881c5eaa11610102578063b09f80f311610095578063c7876ea411610064578063c7876ea4146105f7578063d547741f1461060d578063de4b32621461062d578063f29ff1801461064d57600080fd5b8063b09f80f314610582578063ba0987b714610595578063bba0ed57146105a8578063c1173250146105e257600080fd5b8063a217fddf116100d1578063a217fddf1461050d578063a5a0adc614610522578063ab050bec14610542578063ac43f5141461056257600080fd5b8063881c5eaa1461046757806389805bd91461048757806391d14854146104b45780639ddf0794146104f857600080fd5b806336568abe1161017a5780635797db75116101495780635797db7514610389578063656cf918146103a95780636bbf7b5f1461041357806385f438c11461043357600080fd5b806336568abe1461030e57806339f9c82c1461032e578063455567de1461034957806351cff8d91461036957600080fd5b8063248a9ca3116101b6578063248a9ca31461028657806329d7e69b146102b65780632f2ff15d146102cc57806335077edf146102ee57600080fd5b806301ffc9a7146101e857806306661abd1461021d5780630749abcb1461024b57600080fd5b366101e357005b600080fd5b3480156101f457600080fd5b50610208610203366004611296565b61066d565b60405190151581526020015b60405180910390f35b34801561022957600080fd5b506001546102389061ffff1681565b60405161ffff9091168152602001610214565b34801561025757600080fd5b506102786102663660046112f4565b600a6020526000908152604090205481565b604051908152602001610214565b34801561029257600080fd5b506102786102a136600461130f565b60009081526020819052604090206001015490565b3480156102c257600080fd5b5061027860025481565b3480156102d857600080fd5b506102ec6102e7366004611328565b610706565b005b3480156102fa57600080fd5b506102ec610309366004611368565b610730565b34801561031a57600080fd5b506102ec610329366004611328565b61076c565b34801561033a57600080fd5b506008546102389061ffff1681565b34801561035557600080fd5b506102086103643660046113de565b6107fd565b34801561037557600080fd5b506102ec6103843660046112f4565b610818565b34801561039557600080fd5b506102ec6103a436600461130f565b610877565b3480156103b557600080fd5b506006546007546103e39163ffffffff80821692640100000000830490911691600160401b900460ff169084565b6040805163ffffffff958616815294909316602085015260ff909116918301919091526060820152608001610214565b34801561041f57600080fd5b506102ec61042e36600461130f565b610888565b34801561043f57600080fd5b506102787f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e481565b34801561047357600080fd5b506102086104823660046113de565b610899565b34801561049357600080fd5b506102786104a23660046112f4565b60096020526000908152604090205481565b3480156104c057600080fd5b506102086104cf366004611328565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b34801561050457600080fd5b506102786108ac565b34801561051957600080fd5b50610278600081565b34801561052e57600080fd5b506102ec61053d366004611368565b6108e8565b34801561054e57600080fd5b506102ec61055d366004611431565b610924565b34801561056e57600080fd5b5061020861057d366004611454565b610955565b6102ec6105903660046114ae565b6109e3565b6102ec6105a33660046114ae565b610ab0565b3480156105b457600080fd5b506004546005546103e39163ffffffff80821692640100000000830490911691600160401b900460ff169084565b3480156105ee57600080fd5b50610278610b7d565b34801561060357600080fd5b5061027860035481565b34801561061957600080fd5b506102ec610628366004611328565b610b9d565b34801561063957600080fd5b506102ec61064836600461130f565b610bc2565b34801561065957600080fd5b506102ec610668366004611431565b610bd3565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061070057507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60008281526020819052604090206001015461072181610c04565b61072b8383610c11565b505050565b600061073b81610c04565b506006805463ffffffff9283166401000000000267ffffffffffffffff199091169290931691909117919091179055565b6001600160a01b03811633146107ef5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084015b60405180910390fd5b6107f98282610caf565b5050565b6000610810846004600101548585610955565b949350505050565b7f10dac8c06a04bec0b551627dad28bc00d6516b0caacd1c7b345fcdb5211334e461084281610c04565b6040516001600160a01b038316904780156108fc02916000818181858888f1935050505015801561072b573d6000803e3d6000fd5b600061088281610c04565b50600755565b600061089381610c04565b50600555565b6000610810846006600101548585610955565b6004546003546000916064916108cc91600160401b900460ff1690611506565b6108d6919061151d565b6003546108e3919061153f565b905090565b60006108f381610c04565b506004805463ffffffff9283166401000000000267ffffffffffffffff199091169290931691909117919091179055565b600061092f81610c04565b506004805460ff909216600160401b0268ff000000000000000019909216919091179055565b60008360000361096757506000610810565b6109da838380806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250506040516bffffffffffffffffffffffff1960608b901b166020820152889250603401905060405160208183030381529060405280519060200120610d2e565b95945050505050565b33600090815260096020526040902054600211610a425760405162461bcd60e51b815260206004820152601660248201527f45786365656473207075726368617365206c696d69740000000000000000000060448201526064016107e6565b336000908152600960205260408120805460019290610a62908490611552565b90915550506040805160808101825260045463ffffffff80821683526401000000008204166020830152600160401b900460ff169181019190915260055460608201526107f9908383610d44565b336000908152600a6020526040902054600211610b0f5760405162461bcd60e51b815260206004820152601660248201527f45786365656473207075726368617365206c696d69740000000000000000000060448201526064016107e6565b336000908152600a60205260408120805460019290610b2f908490611552565b90915550506040805160808101825260065463ffffffff80821683526401000000008204166020830152600160401b900460ff169181019190915260075460608201526107f9908383610d44565b6006546003546000916064916108cc91600160401b900460ff1690611506565b600082815260208190526040902060010154610bb881610c04565b61072b8383610caf565b6000610bcd81610c04565b50600355565b6000610bde81610c04565b506006805460ff909216600160401b0268ff000000000000000019909216919091179055565b610c0e8133610ed4565b50565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166107f9576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610c6b3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16156107f9576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600082610d3b8584610f52565b14949350505050565b825163ffffffff16421015610d9b5760405162461bcd60e51b815260206004820152600e60248201527f53616c65206e6f7420737461727400000000000000000000000000000000000060448201526064016107e6565b826020015163ffffffff164210610df45760405162461bcd60e51b815260206004820152600e60248201527f53616c652068617320656e64656400000000000000000000000000000000000060448201526064016107e6565b610e043384606001518484610955565b610e505760405162461bcd60e51b815260206004820152601960248201527f596f75277265206e6f7420616c6c6f77656420746f206275790000000000000060448201526064016107e6565b6064836040015160ff16600354610e679190611506565b610e71919061151d565b600354610e7e919061153f565b3414610ecc5760405162461bcd60e51b815260206004820152601d60248201527f53656e742076616c7565206e6f7420657175616c20746f20707269636500000060448201526064016107e6565b61072b610f9f565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166107f957610f10816001600160a01b0316601461107f565b610f1b83602061107f565b604051602001610f2c929190611589565b60408051601f198184030181529082905262461bcd60e51b82526107e69160040161160a565b600081815b8451811015610f9757610f8382868381518110610f7657610f7661163d565b6020026020010151611267565b915080610f8f81611653565b915050610f57565b509392505050565b60015460085461ffff918216911610610ffa5760405162461bcd60e51b815260206004820152600860248201527f536f6c64206f757400000000000000000000000000000000000000000000000060448201526064016107e6565b6008805461ffff1690600061100e8361166c565b91906101000a81548161ffff021916908361ffff160217905550507fed7e1cc32737aac2f5c91387879185d74677bc68b69562a9d6dcd77622e8b62d600860009054906101000a900461ffff1661ffff1660025461106c9190611552565b60405190815260200160405180910390a1565b6060600061108e836002611506565b611099906002611552565b67ffffffffffffffff8111156110b1576110b161168d565b6040519080825280601f01601f1916602001820160405280156110db576020820181803683370190505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106111125761111261163d565b60200101906001600160f81b031916908160001a9053507f78000000000000000000000000000000000000000000000000000000000000008160018151811061115d5761115d61163d565b60200101906001600160f81b031916908160001a9053506000611181846002611506565b61118c906001611552565b90505b6001811115611211577f303132333435363738396162636465660000000000000000000000000000000085600f16601081106111cd576111cd61163d565b1a60f81b8282815181106111e3576111e361163d565b60200101906001600160f81b031916908160001a90535060049490941c9361120a816116a3565b905061118f565b5083156112605760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016107e6565b9392505050565b6000818310611283576000828152602084905260409020611260565b6000838152602083905260409020611260565b6000602082840312156112a857600080fd5b81357fffffffff000000000000000000000000000000000000000000000000000000008116811461126057600080fd5b80356001600160a01b03811681146112ef57600080fd5b919050565b60006020828403121561130657600080fd5b611260826112d8565b60006020828403121561132157600080fd5b5035919050565b6000806040838503121561133b57600080fd5b8235915061134b602084016112d8565b90509250929050565b803563ffffffff811681146112ef57600080fd5b6000806040838503121561137b57600080fd5b61138483611354565b915061134b60208401611354565b60008083601f8401126113a457600080fd5b50813567ffffffffffffffff8111156113bc57600080fd5b6020830191508360208260051b85010111156113d757600080fd5b9250929050565b6000806000604084860312156113f357600080fd5b6113fc846112d8565b9250602084013567ffffffffffffffff81111561141857600080fd5b61142486828701611392565b9497909650939450505050565b60006020828403121561144357600080fd5b813560ff8116811461126057600080fd5b6000806000806060858703121561146a57600080fd5b611473856112d8565b935060208501359250604085013567ffffffffffffffff81111561149657600080fd5b6114a287828801611392565b95989497509550505050565b600080602083850312156114c157600080fd5b823567ffffffffffffffff8111156114d857600080fd5b6114e485828601611392565b90969095509350505050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610700576107006114f0565b60008261153a57634e487b7160e01b600052601260045260246000fd5b500490565b81810381811115610700576107006114f0565b80820180821115610700576107006114f0565b60005b83811015611580578181015183820152602001611568565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516115c1816017850160208801611565565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516115fe816028840160208801611565565b01602801949350505050565b6020815260008251806020840152611629816040850160208701611565565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b600060018201611665576116656114f0565b5060010190565b600061ffff808316818103611683576116836114f0565b6001019392505050565b634e487b7160e01b600052604160045260246000fd5b6000816116b2576116b26114f0565b50600019019056fea2646970667358221220e15a92ed0b74fc60c03918a5d86a77cfeef6698cb8efc15f11eb7aaed62e58cf64736f6c63430008110033'

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
    s1: PromiseOrValue<BigNumberish>,
    e1: PromiseOrValue<BigNumberish>,
    m1: PromiseOrValue<BytesLike>,
    s2: PromiseOrValue<BigNumberish>,
    e2: PromiseOrValue<BigNumberish>,
    m2: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AmbrusStudioSalerL2> {
    return super.deploy(
      _count,
      _startId,
      s1,
      e1,
      m1,
      s2,
      e2,
      m2,
      overrides || {}
    ) as Promise<AmbrusStudioSalerL2>
  }
  override getDeployTransaction(
    _count: PromiseOrValue<BigNumberish>,
    _startId: PromiseOrValue<BigNumberish>,
    s1: PromiseOrValue<BigNumberish>,
    e1: PromiseOrValue<BigNumberish>,
    m1: PromiseOrValue<BytesLike>,
    s2: PromiseOrValue<BigNumberish>,
    e2: PromiseOrValue<BigNumberish>,
    m2: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_count, _startId, s1, e1, m1, s2, e2, m2, overrides || {})
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
