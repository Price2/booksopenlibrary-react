import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';



class WantToRead extends React.Component {
    constructor() {
        super();
        this.state = {};
    }



    render() {

        return (
            <>
                <div id='Want-To-Read-wrapper'>
                    <h3 className='mt-5 fw-bold'>Want To Read</h3>
                    <hr />
                    <div className='container'>
                        <div className='row justify-content-center'>
                        {this.props.wantToReadState? this.props.wantToReadState.map((book, idx)=> 
                        
                        <div key={idx} className='col-md-3'>
                                            <div className='img-wrapper'>
                                                <img className='w-100' src={"https://covers.openlibrary.org/b/id/" + book.cover_i + "-M.jpg"} alt="book-cover" />
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu >
                                                            <Dropdown.Item href="">Want To Read</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=> this.props.read(book)} href="">Read</Dropdown.Item>
                                                            <Dropdown.Item onClick={()=> this.props.currentlyReading(book)} href="">Currently Reading</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                            </div>
                                            <h5>{book.title}</h5>
                                            <h6 >{book.author_name}</h6>
                                        </div>
                        
                        ): <></>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default WantToRead;