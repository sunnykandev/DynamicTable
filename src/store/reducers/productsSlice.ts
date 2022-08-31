import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ProductDataset, ProductEditParam } from '../../types';

const initialState: {value:ProductDataset} = {
    value:[
        {
          sku: 'Item 0001',
          price: 50.00,
          quantity: 1,
          shipping: 15.00,
        },
        {
          sku: 'Item 0002',
          price: 1.00,
          quantity: 22,
          shipping: 15.00,
        },
    ]
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    editProduct: (state, action: PayloadAction<ProductEditParam>) => {
        state.value.map((product,i)=>{
            if(product.sku == action.payload.sku){
                state.value[i] = {...product, ...action.payload}
            }
        })
    },
  }
});

export const { editProduct } = productsSlice.actions;

export const products = (state:RootState) => state.products.value

export default productsSlice.reducer;