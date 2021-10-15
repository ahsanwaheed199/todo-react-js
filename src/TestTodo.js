import React, {useState, useEffect} from 'react'


const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};

const Testtodo = () => {

    const [inputData, setInputData] = useState('');

    const [items, setItems] = useState(getLocalItems());

    const [toogleSubmit, setToggleSubmit] = useState(true);

    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('please write todo list items');
        }
        else if (inputData && !toogleSubmit) {
            
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        console.log('I am matched ');
                        return { ...elem, name:inputData };
                    }
                    return elem;
                })
            );

            setToggleSubmit(true);

            setInputData('');

            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString() , name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
        
    }

    const deleteItem = (id) => {
        const updatedItems = items.filter((elem) => {
            return elem.id !== id;
        })
        setItems(updatedItems);
    }

    const editItem = (id) => {

        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        console.log(newEditItem.name);

        setToggleSubmit(false);

        setInputData(newEditItem.name);
        console.log("my new input name is" + inputData);
        setIsEditItem(id);

    }


    const remvoveAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);

    return (
       <>
            <div className="App">
                <div >
                   <h1> TODO APP </h1>
                    <div >
                        <input  placeholder=" Add item..."
                            value={inputData }
                            onChange={(e) => setInputData(e.target.value)}
                        />

                        { toogleSubmit ? <button  onClick={() => addItem()}> Add Todo</button> :  <button  onClick={addItem}> Edit</button> }
                        
                    </div>

                    <div >
                        {
                            items.map((elem) => {
                                return (
                                    <div  key={elem.id}>
                                        <h3> {elem.name} </h3>
                                        <div >
                                            <button  onClick={() => editItem(elem.id)}> Edit</button>
                                            <button  onClick={() => deleteItem(elem.id)}> Delete</button>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    <div >
                        <button  target="_blank" onClick={remvoveAll}>Delete All</button>
                    </div>

                </div>
         </div>   
      </>
    )
}

export default Testtodo