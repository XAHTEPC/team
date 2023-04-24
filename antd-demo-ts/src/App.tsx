import React, { useEffect, useState } from 'react';
import { Button} from 'antd';
import { RedoOutlined, ClearOutlined, FileAddOutlined, DeleteOutlined} from '@ant-design/icons';
import { Layout, theme, Input } from 'antd';
import Card from 'antd/es/card';
import { Col, Row } from 'antd/es/grid';
import axios from 'axios';

const { Header, Content} = Layout;
const { TextArea } = Input;

const App: React.FC = ()=> {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todoID, settodoID] = useState('');
  const [cardtitle, setcardtitle] = useState(''); 
  const [cardA, setA] = useState('');   
  const [cardDescr, setcardDescr] = useState('')
  const [ToDoAll, setToDoAll] = useState<IToDo[]>([]);

  interface Change{
    id: string;
    title: string;
    description: string;
  }

  interface IToDo {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
    newtitle: string;
    newdescription: string;
    }


function setDefault(){
  setTitle('');
  setDescription('');
  settodoID('');
  setcardDescr('');
  setcardtitle('');
}

function getText(id: IToDo){
  id.newtitle = id.title;

}


async function getAllToDo() {
    await axios.get("http://localhost:4444/").then((res) =>{
      setToDoAll(res.data);
      
    })
}

async function addToDo() {
  if(title && description){
    await axios.post("http://localhost:4444/todos",{
      title: title,
      description: description,
    }).then((res) =>{
      getAllToDo();
      setDefault();
    }).catch((error) =>{
      console.log(error);
    })
  }
}

async function deleteAllToDo() {
  await axios.delete("http://localhost:4444/todos")
  .then((res) =>{
    getAllToDo();
    setDefault();
  }).catch((error) =>{
    console.log(error);
  })
}

async function deleteToDo(ID: string) {
  await axios.delete("http://localhost:4444/todos" + '/' + ID)
  .then((res) =>{
    getAllToDo();
    setDefault();
  }).catch((error) =>{
    console.log(error);
  })
}


async function updateToDo(todo: IToDo) {
  let newtitle = cardtitle;
  let newdescription = cardDescr;
    if (!newtitle) {
      newtitle = ToDoAll.filter(ToDo => ToDo.id === todo.id)[0].title;
    }
    if (!newdescription) {
      newdescription = ToDoAll.filter(ToDo => ToDo.id === todo.id)[0].description;
    }
    await axios.patch("http://localhost:4444/todos"  + '/' + todo.id, {
      title: newtitle,
      description: newdescription,
    }).then((res) => {
      getAllToDo();
      setDefault();
    }).catch((error) => {
      console.log(error);
    })
 }

useEffect(() => {
     getAllToDo();
     }, [])

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header" >   
         <div className="logo">
          ToDoList
          </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0' }}>
        <Row>
          <Col span={8}>
            {ToDoAll.map((todo: IToDo) =>
            <div key={todo.id}>
              <Card bordered={false}
              style={{ width: 300 }} 
                  actions={[
                <RedoOutlined key="resave" onClick={() => updateToDo(todo)}/>,
                <DeleteOutlined key="delete" onClick={() => deleteToDo(todo.id)}/>]}>
                <Input  defaultValue={todo.title} bordered={false} onChange={(e) => {
                  setcardtitle(e.target.value);
                  console.log(cardtitle);}}/>
                <br />
                <br />
                <TextArea name='desc' defaultValue={todo.description} onChange={(e) => {
                  setcardDescr(e.target.value);
                  console.log(cardtitle);}} />
              </Card>
              <br />
              </div> 
            
          )}


          </Col>
          <Col span={8}>
            <br />
            <br />
            <Button type="primary" ghost onClick={getAllToDo}>
              Показать все
            </Button>
            <br />
            <br />
            <Button  type="primary" danger ghost onClick={deleteAllToDo}>
              Удалить все
            </Button>
            </Col>
          
          
          
          <Col span={8}>
            <Card title="Новая ToDo's" bordered={false} 
                style={{ width: 300 }} actions={[
                  <ClearOutlined key="clean" onClick={setDefault}/>,
                  <FileAddOutlined key="save" onClick={addToDo}></FileAddOutlined>]}>
                      <Input name='name' placeholder="Название" 
                        value={title} onChange={(e) => setTitle(e.target.value)}
                          type="text" className="inputTitle" />
                      <br />
                      <br />
                      <TextArea name='descript' placeholder="Описание" value={description} 
                              onChange={(e) => setDescription(e.target.value)} allowClear/>
                    
            </Card>
          </Col>
        </Row>
      </Layout>
      </Content>
    </Layout>
  );
};

export default App;