import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { client } from '../../client';
import Spinner from '../Spinner/Spinner';
import { categories } from '../../utils/data';
import styles from './CreatePin.module.css';
import { Avatar, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';





export default function CreatePin ({ user }) {

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [fields, setFields] = useState(null);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setwrongImageType] = useState(false)
  const [loading, setLoading] = useState(false);

  // console.log("title ", title);
  // console.log("about ", about);
  // console.log("fields ", fields);
  // console.log("destination ", destination);
  // console.log("category ", category);
  // console.log("imageAsset ", imageAsset);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/svg' || type === 'image/tiff') {
      setwrongImageType(false);
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], {
          contentType: type,
          fileName: name,
        })
        .then ((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch(error => console.error("Image Upload error: ", error))

    }
    else {
      setwrongImageType(true)
    }
  }


  const savePin = () => {
    if ( title && about && destination && category && imageAsset?._id ) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id
        },
        category,
      }

      client.create(doc)
        .then(() => {
          navigate('/')
        })
    }

    else {
      setFields(true)

      setTimeout(() => setFields(false), 2000)
  }
}




  // if (!user) {
  //   navigate('/');
  //   return;
  // }

  return (
    <div className={styles.container}>
      {
        fields && (
          <p className={styles.error_msg}> <i> Please fill all fields * </i> </p>
        )
      }

      <div className={styles.semi_container}>
        <div>
          <div>

            { loading && <Spinner message="Please Wait :) ..." /> }
            { wrongImageType && <i style={{color: 'red'}}> <small> wrong image type </small> </i> }
            
            {
              !imageAsset ? (
                <label> 
                  <div>
                    <div>
                      <p className={styles.file_btn}> 
                        <IconButton style={{background: '#28003b', color: 'white'}}>
                          <AiOutlineCloudUpload />
                        </IconButton>
                      </p>
                      <h3> UpLoad Pin Image </h3>
                    </div>
                    <div>
                      <p> Use JPG, PNG, SVG, GIF less than 20mb </p> 
                    </div>
                  </div>

                  <div className={styles.file}>
                    <TextField
                      type='file'
                      name='upload-image'
                      onChange = { uploadImage }
                      size="small"
                    />
                  </div>

                </label>
              ) : (
                <div className={styles.edit_img}>
                  <img src={imageAsset?.url} alt="uploaded picture" />

                  <IconButton className={styles.deleteButton} size='small' onClick={() => setImageAsset(null)}>
                    <MdDelete />
                  </IconButton>

                </div>
              )
            }
          </div>
        </div>

        <div className={styles.main_form}>
          <TextField
            type='text'
            value = {title}
            label = 'Add your title'
            onChange = { e => setTitle(e.target.value) }
            size="small"
            sx={{ margin: '2% 0'}}
          />

          <TextField
            type='text'
            value = {about}
            label = "What's ncheta about"
            multiline
            rows = {4}
            onChange = { e => setAbout(e.target.value) }
            size="small"
            sx={{ margin: '2% 0'}}
          />

          <TextField
            type='text'
            value = {destination}
            label = "Add a destination Link"
            onChange = { e => setDestination(e.target.value) }
            size="small"
            sx={{ margin: '2% 0'}}
            />

          <div>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Select Category </InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Select Category"
            size='small'
            sx={{ margin: '2% 0'}}
          >
            {
              categories.map( category => <MenuItem value={`${category.name}`}> {category.name} </MenuItem> )
            }
          </Select>
          </FormControl>
          </div>
          <button onClick={savePin} variant='contained'> Cheta! </button>
        </div>

      </div>
    </div>
  )
}






