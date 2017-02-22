import React from 'react';
import PlaylistsIndex from './playlists_index';
import TracksIndex from './tracks_index'

class UserProfile extends React.Component {
  constructor (props) {
    super(props);

    this.state = { view: "tracks" };
  }

  componentWillMount () {
    this.props.fetchUser();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user.id !== this.props.user.id) {
      this.props.fetchUser();
      this.props.fetchUserTracks();
      this.props.fetchUserPlaylists();
    }
  }

  render () {
    const user = this.props.user;
    if (!user) return (<div></div>);

    return (
      <section className="user-profile">
        <section className="header">
          <ul>
            <li>
              <h2>{ user ? user.username : "" }</h2>
            </li>
            <li>
              <h3>{ user ? user.location : "" }</h3>
            </li>
          </ul>
          <img src={user ? user.photo_url : "" }/>
        </section>

        <section className="user-nav">
          <h1 className={ this.state.view === "tracks" ? "active" : "" }
            onClick={ () => this.setState({ view: "tracks" }) }>
            Tracks
          </h1>
          <h1 className={ this.state.view === "playlists" ? "active" : "" }
            onClick={ () => this.setState({ view: "playlists" }) }>
            Playlists
          </h1>
        </section>

        <section className="user-main">
          { this.state.view === "tracks" ?
            <TracksIndex
              tracks={this.props.tracks}
              togglePlay={this.props.togglePlay}
              currentTrack={this.props.currentTrack}
              receiveCurrentTrack={this.props.receiveCurrentTrack} /> :
              <PlaylistsIndex
                playlists={this.props.playlist}
                currentTrack={this.props.currentTrack}
                receiveCurrentTrack={this.props.receiveCurrentTrack} />
          }

          <section className="sidebar">
            <h4>Bio</h4>
            <ul>
              { user.bio }
            </ul>
          </section>
        </section>

      </section>
    )
  }
}

export default UserProfile;
