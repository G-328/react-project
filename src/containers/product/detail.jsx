import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'

import { BASE_IMAGE_URL } from '../../config'
import { reqProductById, reqCategory } from '../../api'
import LinkButton from '../../components/link-button'
import './detail.less'
import memory from '../../utils/memory'

const Item = List.Item

/* 
Admin的商品子路由组件(商品详情)
*/
export default class Detail extends Component {

  state = {
    product: {},
    categoryName: '',
  }

  getProduct = async () => {

    //如果有直接使用
    //取出内存中保存的product
    const product = memory.product
    if (product._id) {
      this.setState({
        product
      })
      this.getCategory(product.categoryId)
      return 
    }

    //如果没有需要发请求获取
    //得到params参数的id值
    const id = this.props.match.params.id
    const result = await reqProductById(id)
    if (result.status === 0) {
      const product = result.data
      this.setState({
        product
      })
      this.getCategory(product.categoryId)
    }
  }

  getCategory = async (categoryId) => {
    const result = await reqCategory(categoryId)
    console.log(result)
    if (result.status === 0) {
      this.setState({
        categoryName: result.data.name
      })
    }
  }

  componentDidMount() {
    this.getProduct()
  }

  render() {

    const { product, categoryName } = this.state
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <Icon type="arrow-left"></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )

    return (
      <Card title={title} className="product-detail">
        <List>
          <Item>
            <span className="product-detail-left">商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className="product-detail-left">所属分类:</span>
            {/* <span>{product.categoryId}</span> */}
            <span>{categoryName}</span>
          </Item>
          <Item>
            <span className="product-detail-left">商品图片:</span>
            {
              product.imgs && product.imgs.map(
                img => <img key={img} src={BASE_IMAGE_URL + img} className="product-detail-img" alt="img" />
              )
            }
          </Item>
          <Item>
            <span className="product-detail-left">商品详情:</span>
            <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
          </Item>
        </List>
      </Card>
    )
  }
}
