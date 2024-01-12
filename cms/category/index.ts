import { defineStore } from 'pinia'
import { API } from './const'
import {
  Category,
  GetCategoriesRequest,
  GetCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  CreateCategoryRequest,
  CreateCategoryResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  GetCategoryListRequest,
  GetCategoryListResponse
} from './types'
import { doActionWithError } from '../../request'
import { formalizeAppID } from '../../appuser/app/local'

export const useCategoryStore = defineStore('categories', {
  state: () => ({
    Categories: new Map<string, Array<Category>>()
  }),
  getters: {
    category (): (appID: string | undefined, id: number) => Category | undefined {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        return this.Categories.get(appID)?.find((el) => el.ID === id)
      }
    },
    getCategoryByEntID (): (appID: string | undefined, entID: string) => Category | undefined {
      return (appID: string | undefined, entID: string) => {
        appID = formalizeAppID(appID)
        return this.Categories.get(appID)?.find((el) => el.EntID === entID)
      }
    },
    categories (): (appID: string | undefined) => Array<Category> {
      return (appID: string | undefined) => {
        appID = formalizeAppID(appID)
        return this.Categories.get(appID) || []
      }
    },
    addCategories (): (appID: string | undefined, categories: Array<Category>) => void {
      return (appID: string | undefined, categories: Array<Category>) => {
        appID = formalizeAppID(appID)
        let _categories = this.Categories.get(appID) as Array<Category>
        if (!_categories) {
          _categories = []
        }
        categories.forEach((category) => {
          const index = _categories.findIndex((el) => el.ID === category.ID)
          _categories.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, category)
        })
        this.Categories.set(appID, _categories)
      }
    },
    delCategory (): (appID: string | undefined, id: number) => void {
      return (appID: string | undefined, id: number) => {
        appID = formalizeAppID(appID)
        let _categories = this.Categories.get(appID) as Array<Category>
        if (!_categories) {
          _categories = []
        }
        const index = _categories.findIndex((el) => el.ID === id)
        _categories.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1)
        this.Categories.set(appID, _categories)
      }
    }
  },
  actions: {
    getCategories (req: GetCategoriesRequest, done: (error: boolean, rows: Array<Category>) => void) {
      doActionWithError<GetCategoriesRequest, GetCategoriesResponse>(
        API.GET_CATEGORIES,
        req,
        req.Message,
        (resp: GetCategoriesResponse): void => {
          this.addCategories(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Category>)
        }
      )
    },
    updateCategory (req: UpdateCategoryRequest, done: (error: boolean, row: Category) => void) {
      doActionWithError<UpdateCategoryRequest, UpdateCategoryResponse>(
        API.UPDATE_CATEGORY,
        req,
        req.Message,
        (resp: UpdateCategoryResponse): void => {
          this.addCategories(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Category)
        }
      )
    },
    createCategory (req: CreateCategoryRequest, done: (error: boolean, row: Category) => void) {
      doActionWithError<CreateCategoryRequest, CreateCategoryResponse>(
        API.CREATE_CATEGORY,
        req,
        req.Message,
        (resp: CreateCategoryResponse): void => {
          this.addCategories(undefined, [resp.Info])
          done(false, resp.Info)
        }, () => {
          done(true, {} as Category)
        }
      )
    },
    deleteCategory (req: DeleteCategoryRequest, done: (error: boolean, row: Category) => void) {
      doActionWithError<DeleteCategoryRequest, DeleteCategoryResponse>(
        API.UPDATE_CATEGORY,
        req,
        req.Message,
        (resp: DeleteCategoryResponse): void => {
          this.delCategory(undefined, req.ID)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Category)
        }
      )
    },
    getCategoryList (req: GetCategoryListRequest, done: (error: boolean, rows: Category[]) => void) {
      doActionWithError<GetCategoryListRequest, GetCategoryListResponse>(
        API.GET_CATEGORY_LIST,
        req,
        req.Message,
        (resp: GetCategoryListResponse): void => {
          this.addCategories(undefined, resp.Infos)
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    }
  }
})

export * from './const'
export * from './types'
