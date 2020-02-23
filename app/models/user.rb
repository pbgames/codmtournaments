class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, presence: true, uniqueness: true
  validates :instagram, presence: true
  validates :email, presence: true, uniqueness: true
end
