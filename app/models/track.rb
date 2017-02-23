class Track < ActiveRecord::Base
  validates :name, :user, :release_date, :genre, :audio, :photo, presence: true

  has_attached_file :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\Z/

  has_attached_file :photo, default_url: "fakerjohnmisty.jpeg"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  has_many :comments
  has_many :playlist_tracks
  has_many :playlists, through: :playlist_tracks

  include PgSearch
  multisearchable against: [:name, :genre]
end
