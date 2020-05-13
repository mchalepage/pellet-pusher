import React, {useState, UseEffect } from 'react'
import './Files.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'

const Files = (props) => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose File')
    const [uploadedFile, setUploadedFile] = useState({})
    const [message, setMessage] = useState('')

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
      };
    
      const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const res = await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          });
    
          const { fileName, filePath } = res.data;
    
          setUploadedFile({ fileName, filePath });
    
          setMessage('File Uploaded');
        } catch (err) {
          if (err.response.status === 500) {
            setMessage('There was a problem with the server');
          } else {
            setMessage(err.response.data.msg);
          }
        }
      };

    return(
        <Container>
            <h3>Patient Files</h3>
            <Form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                <input
                    type='file'
                    className='custom-file-input'
                    id='customFile'
                    onChange={onChange}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                    {filename}
                </label>
                </div>

                <input
                type='submit'
                value='Upload'
                className='btn btn-primary btn-block mt-4'
                />
      </Form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
        </Container>
    )
}

export default Files