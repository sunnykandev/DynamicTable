import { ChildrenProps, ProductData } from 'types'
import React from "react";
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { products, editProduct} from '../../store/reducers/productsSlice'
import { EditableCell } from './EditableCell'
import { CURRENCY } from '../../constants'
import './ProductTable.css'

const Table = ({children}: ChildrenProps) => <div className="table" data-testid="table">{children}</div>
const Row = ({children}: ChildrenProps) => <div className="row" data-testid="table">{children}</div>
const Column = ({children}: ChildrenProps) => <div className="column" data-testid="column">{children}</div>
const Cell = ({children}: ChildrenProps) => <div className="cell" data-testid="cell">{children}</div>

export const ProductTable = () => {
  const productsList = useAppSelector(products);
  const dispatch = useAppDispatch();

  const getSubTotal = (price:number, quantity:number):string => {
    let result = price*quantity;
    return result.toFixed(2);
  }
  const getTax = (price:number, quantity:number):string => {
    let result = Number(getSubTotal(price, quantity))*7/100;
    return result.toFixed(2)
  }
  const getTotal = (price:number, quantity:number, shipping:number):string => {
    let result = Number(Number(getSubTotal(price, quantity)) + Number(shipping) + Number(getTax(price, quantity)));
    return result.toFixed(2)
  }

  const handleEditProduct = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: ProductData,
    editProperty: "quantity" | "price" | "shipping"
  ) => {
    const value = e.target.value;
    dispatch(
      editProduct(
        {...product, [editProperty]:value}
      )
    )
  }

  return (
    <Table>
      <Row>
        <Column>Product SKU</Column>
        <Column>Quantity</Column>
        <Column>Price</Column>
        <Column>Subtotal</Column>
        <Column>Shipping</Column>
        <Column>Tax (7%)</Column>
        <Column>Total</Column>
      </Row>
      {
        productsList.map((product:ProductData ,key:number)=>{
          return (
            <Row key={key}>
              <Cell>{product.sku}</Cell>
              <Cell>
                <EditableCell 
                  type="int" 
                  value={product.quantity}
                  onChange={(e) => handleEditProduct(e, product, "quantity")}
                />
              </Cell>
              <Cell>
                <EditableCell 
                  type="float" 
                  value={product.price} 
                  prefix={CURRENCY}
                  onChange={(e) => handleEditProduct(e, product, "price")}
                />
              </Cell>              
              <Cell>
                {CURRENCY}
                {getSubTotal(product.price, product.quantity)}
              </Cell>
              <Cell>
                <EditableCell 
                  type="float" 
                  value={product.shipping} 
                  prefix={CURRENCY}
                  onChange={(e) => handleEditProduct(e, product, "shipping")}
                />
              </Cell>
              <Cell>
                {CURRENCY}
                {getTax(product.price, product.quantity)}
              </Cell>
              <Cell>
                {CURRENCY}
                {getTotal(product.price, product.quantity, product.shipping)}
              </Cell>
            </Row>
          )
        })
      }
    </Table>
  )
}
