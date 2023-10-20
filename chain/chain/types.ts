import { GasType } from '../../base'
import { BaseRequest } from '../../request'
export interface Chain {
    /**
     * @inject_tag: sql:"id"
     * @format int64
     */
    ID: number
    /** @inject_tag: sql:"ent_id" */
    EntID: string
    /** @inject_tag: sql:"chain_type" */
    ChainType: string
    /** @inject_tag: sql:"logo" */
    Logo: string
    /** @inject_tag: sql:"chain_id" */
    ChainID: string
    /** @inject_tag: sql:"native_unit" */
    NativeUnit: string
    /** @inject_tag: sql:"atomic_unit" */
    AtomicUnit: string
    /**
     * @inject_tag: sql:"unit_dec_exp"
     * @format int64
     */
    UnitExp: number
    Nickname: string
    /** @inject_tag: sql:"env" */
    ENV: string
    GasType: GasType
    /**
     * @inject_tag: sql:"created_at"
     * @format int64
     */
    CreatedAt: number
    /**
     * @inject_tag: sql:"updated_at"
     * @format int64
     */
    UpdatedAt: number
  }

export interface GetChainsRequest extends BaseRequest {
    Offset: number
    Limit: number
}

export interface GetChainsResponse {
    Infos: Chain[]
    Total: number
}
