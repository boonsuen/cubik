import React from 'react';
import { Link } from 'react-static';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SettingDropdown from './SettingDropdown';
import MainRoutes from './MainRoutes';
import SidebarBottom from './SidebarBottom';

import auth from '../../firebase/auth';
import db from '../../firebase/db';
import { InitialDataContext } from '../CubikApp';

import Search from '../../assets/img/icons/search.svg';
import Clock from '../../assets/img/icons/clock.svg';

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
  position: relative;
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

export const LinkWithIcon = styled(Link)`
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
  handleAddList = (inputValue) => {
    this.setState((state) => ({
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
  };
  render() {
    return (
      <StyledSidebar>
        <Scrollable>
          <Topbar>
            <SettingDropdown logoutUser={this.logoutUser} />   
            <QuickFind>
              <SearchIcon>
                <img src={Search} alt="Search" />
              </SearchIcon>
              <QuickFindText>Quick Find</QuickFindText>
            </QuickFind>
          </Topbar>
          <RoutesContainer>
            <MainRoutes />
            <TemplateRoutesContainer>
              <Label>Templates</Label>
              <LinkWithIcon to="/app/reading-list" prefetch={true}>
                <img src={Clock} alt="Reading list" />
                <span>Reading List</span>
              </LinkWithIcon>
            </TemplateRoutesContainer>     
            <UserListsContainer>
              <Label>My Lists</Label>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => {
                    return (
                      <UserLists>
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {this.props.lists.map((list, index) => (
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
                    );
                  }}
                </Droppable>
              </DragDropContext>
            </UserListsContainer>            
          </RoutesContainer>
        </Scrollable>
        <SidebarBottom handleAddList={this.props.handleAddList} />      
      </StyledSidebar>
    );
  }
}

export default props => (
  <InitialDataContext.Consumer>
    {data => <Sidebar {...props} lists={data.lists} userId={data.user.id} />}
  </InitialDataContext.Consumer>
);