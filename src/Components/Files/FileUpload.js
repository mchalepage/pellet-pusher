import React, {Component} from 'react'
import axios from 'axios'

class FileUpload extends Component {
    constructor() {
        super()
        this.state = {
            file: null
        }
    }

    submitFile = event => {
        event.preventDefault()
        const formData = new FormData()
        formData.append('file', this.state.file[0])
        axios.post(`/api/s3/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {

        }).catch(err => {
            console.log(err)
        })
    }

    handleFileUpload = event => {
        this.setState({file: event.target.files})
    }

    render(){
        return(
            <form onSubmit={this.submitFile}>
                <input label='Upload File' type="file" onChange={this.handleFileUpload} />
                <button type='submit'>Send</button>
            </form>
        )
    }

}