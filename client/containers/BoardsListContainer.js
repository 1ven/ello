import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { getBoards, createBoard } from '../actions/boardsActions';
import BoardsList from '../components/BoardsList.js';

class BoardsListContainer extends Component {
    constructor(props) {
        super(props);
        this.handleBoardCreatorSubmit = this.handleBoardCreatorSubmit.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(getBoards());
    }

    handleBoardCreatorSubmit(title) {
        const { dispatch } = this.props;
        dispatch(createBoard(title));
    }

    render() {
        const { boards } = this.props;
        return (
            <BoardsList
                boards={boards}
                onBoardCreatorSubmit={this.handleBoardCreatorSubmit}
            />
        );
    }
}

BoardsListContainer.propTypes = {
    boards: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    const { boards, lists, cards } = state.entities;
    return {
        boards: state.boards.ids.map(id => boards[id])
    };
};

export default connect(
    mapStateToProps
)(BoardsListContainer);
