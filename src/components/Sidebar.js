import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AddListModal } from './Modals';

import auth from '../firebase/auth';
import db from '../firebase/db';
import { InitialDataContext } from './CubikApp';

import Setting from '../assets/img/icons/setting.svg';
import SettingArrow from '../assets/img/icons/setting_arrow.svg';
import Search from '../assets/img/icons/search.svg';
import Home from '../assets/img/icons/home.svg';
import Clock from '../assets/img/icons/clock.svg';
import Boxes from '../assets/img/icons/boxes.svg';
import Trash from '../assets/img/icons/trash.svg';
import AddList_Icon from '../assets/img/icons/AddList.svg';

const StyledSidebar = styled.div`
  width: 260px;
  box-shadow: 5px 0 5px rgba(235, 233, 255, 50%);
  z-index: 1;  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Scrollable = styled.div`
  overflow: scroll;
`;

const Topbar = styled.div`
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #eceef2;
  padding: 0 29px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingDropdownContainer = styled.button`
  display: flex;
  align-items: center;
`;

const SettingIcon = styled.img`
  width: 20px;
  margin-right: 5px;
`;

const QuickFind = styled.button`
  display: flex;
  align-items: center;
  color: #8b8dac;
  font-weight: 500;
`;

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  margin-right: 7px;
  border-radius: 5px;
  box-shadow: 0 2px 4px #e4e0ff;
`;

const QuickFindText = styled.div`
  margin-top: 5px;
`;

const RoutesContainer = styled.div`
  padding: 0 29px;
`;

const MainRoutes = styled.div`
  padding: 9px 0;
  border-bottom: 1px solid #e6e9ec;
  margin-bottom: 16px;
`;

const LinkWithIcon = styled(Link)`
  margin: 9px 0;
  display: flex;
  align-items: center;
  color: #56578c;
  font-weight: 500;

  img {
    margin-right: 10px;
    width: 20px;
  }

  span {
    margin-top: 5px;
    display: inline-block;
  }
`;

const TemplateRoutesContainer = styled.div`
  margin-bottom: 16px;
`;

const UserListsContainer = styled.div`
  
`;

const Label = styled.div`
  color: #7172a6;
  font-size: 14px;
  font-weight: 600;
`;

const UserLists = styled.div`
  margin: 5px 0 15px 0;

  a {
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    color: #8080a2;
    display: block;
    padding: 7px 0;
    transition: color .2s;
  }

  a.active {
    color: #262660;
    position: relative;
  }

  .active::before {
    background: #6067f1;
    position: absolute;
    width: 2px;
    height: 19px;
    display: block;
  }
`;

const SidebarBottom = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #eceef2;
  padding: 0 29px;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
`;

const AddListBtn = styled.button`
  color: #65659d;
  font-weight: 500;

  img {
    margin-right: 8px;
  }
`;

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging && '#efffef',
  margin: '0',
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver && '#ffefef',
});

class Sidebar extends React.Component {
  state = {
    showModal: false,
    lists: this.props.lists
  }
  componentDidUpdate() {
    console.log('siderbar updated');
  }
  logoutUser = () => {
    auth.signOut().then(() => {
      console.log('signed out');
      this.props.toggleAuth(false, 'done');
    });
  }
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }
  handleAddList = (inputValue) => {
    if (!inputValue) return;
    this.setState((state) => ({
      showModal: !state.showModal,
      lists: [...state.lists, {title: inputValue, id: 'temporary-id'}]
    }), () => {
      db.collection(`users/${this.props.userId}/lists`).add({
        title: inputValue,
        order: this.state.lists.length - 1,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState((state) => ({
          lists: [
            ...state.lists.filter(list => list.id !== 'temporary-id'),
            {title: inputValue, id: docRef.id}
          ]
        }));
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    });
  }  
  onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);

    const lists = reorder(
      this.state.lists,
      result.source.index,
      result.destination.index
    );

    this.setState({
      lists,
    });
  }
  render() {
    return (
      <StyledSidebar>
        <Scrollable>
          <Topbar>
            <SettingDropdownContainer>
              <SettingIcon src={Setting} alt="Setting" />
              <img src={SettingArrow} alt="down arrow" />
            </SettingDropdownContainer>            
            <QuickFind>
              <SearchIcon>
                <img src={Search} alt="Search" />
              </SearchIcon>
              <QuickFindText>Quick Find</QuickFindText>
            </QuickFind>
          </Topbar>
          <RoutesContainer>
            <MainRoutes>
              <LinkWithIcon to="/app" prefetch={true}>
                <img src={Home} alt="All Links" />
                <span>All links</span>
              </LinkWithIcon>
              <LinkWithIcon to="/app/unsorted" prefetch={true}>
                <img src={Boxes} alt="Unsorted" />
                <span>Unsorted</span>
              </LinkWithIcon>
              <LinkWithIcon to="/app/trash" prefetch={true}>
                <img src={Trash} alt="Trash" />
                <span>Trash</span>
              </LinkWithIcon>
            </MainRoutes>  
            <TemplateRoutesContainer>
              <Label>Templates</Label>
              <LinkWithIcon to="/app/reading-list" prefetch={true}>
                <img src={Clock} alt="Reading list" />
                <span>Reading list</span>
              </LinkWithIcon>
            </TemplateRoutesContainer>     
            <UserListsContainer>
              <Label>My Lists</Label>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <UserLists>
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        {this.state.lists.map((list, index) => (
                          <Draggable key={`listTitle-${list.id}`} draggableId={list.id} index={index}>
                            {(provided, snapshot) => (
                              <p
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              ><Link to={`/app/${list.id}`} prefetch={true}>{list.title}</Link></p>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    </UserLists>
                  )}
                </Droppable>
              </DragDropContext>
            </UserListsContainer>            
          </RoutesContainer>
        </Scrollable>
        <SidebarBottom>
          <AddListBtn 
            type="button" 
            onClick={this.toggleModal}
          >
            <img src={AddList_Icon} alt="Add List"/> New List
          </AddListBtn>          
        </SidebarBottom>
        <AddListModal
          isOpen={this.state.showModal}
          onRequestClose={this.toggleModal}
          contentLabel="Create New List Modal"
        >
          <h2>Create new list</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            this.handleAddList(this.input.value);
          }}>
            <input 
              placeholder="Name your list"
              ref={(el) => { this.input = el }} 
              autoFocus  
            />
            <div>
              <button type="submit">Add</button>
              <button onClick={this.toggleModal} type="button">Cancel</button>
            </div>
          </form>
        </AddListModal>
      </StyledSidebar>
    );
  }
}

export default props => (
  <InitialDataContext.Consumer>
    {data => <Sidebar {...props} lists={data.lists} userId={data.user.id} />}
  </InitialDataContext.Consumer>
);