import { Dictionary } from '../entities/dictionary.entity';

export interface DictionaryRepository {
  createDictionary(dic: Dictionary): Promise<boolean>;

  updateDictionary(dic: Dictionary): Promise<boolean>;

  deleteDictionary(id: string): Promise<boolean>;

  getDictionaryById(id: string): Promise<Dictionary | null>;

  getDictionaries(): Promise<Dictionary[]>;
}
