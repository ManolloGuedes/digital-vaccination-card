export interface Validable {
  validate(): Boolean
  getAcceptableStructure(): Object
}