import { Component, ChangeEvent } from "react";
import ACMEDataService from "../services/ACME.service";
import ACMEData from '../types/data.type';
type Props = {};

type State = {
  tutorials: Array<ACMEData>,
  currentTutorial: ACMEData | null,
  currentIndex: number,
  searchTitle: string
};

export default class ACMEList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTutorials() {
    ACMEDataService.get('74db8efa2a6db279393b433d97c2bc843f8e32b0')
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial: ACMEData, index: number) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    ACMEDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    ACMEDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-md-6">
            <h4>Tutorials List</h4>
  
            <ul className="list-group">
              {tutorials &&
                tutorials.map((tutorial: ACMEData, index: number) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                ))}
            </ul>
  
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentTutorial ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTutorial.published ? "Published" : "Pending"}
                </div>
  
                <Link
                  to={"/tutorials/" + currentTutorial.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div> */}
        </div>
      );
    }
}