import React, { useEffect, useState } from 'react'
import './Edit.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({ url }) => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    image: ""
  })

  // ✅ Fetch existing food data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/food/${id}`)
        if (res.data.success) {
          setData(res.data.data)
        } else {
          toast.error("Failed to load data")
        }
      } catch (error) {
        toast.error("Error fetching data")
      }
    }

    fetchData()
  }, [id, url])

  // ✅ Handle input change
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  // ✅ Submit update
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)

    // only update image if changed
    if (image) {
      formData.append("image", image)
    }

    try {
      const response = await axios.put(`${url}/food/update/${id}`, formData)

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/list")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error("Update failed")
    }
  }

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className="flex-col">

        {/* Image */}
        <div className="add-img-upload flex-col">
          <p>Update image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${url}/images/${data.image}`
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
          />
        </div>

        {/* Name */}
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
          />
        </div>

        {/* Description */}
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            rows="6"
            name='description'
          />
        </div>

        {/* Category + Price */}
        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Pizza">Pizza</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Pasta">Pasta</option>
              <option value="Cake">Cake</option>
              <option value="Noodles">Noodles</option>
              <option value="Pure Veg">Pure Veg</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
            />
          </div>

        </div>

        <button type='submit' className='add-button'>Update</button>
      </form>
    </div>
  )
}

export default Edit