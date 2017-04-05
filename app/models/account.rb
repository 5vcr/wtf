class Account < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook]
  belongs_to :user

  def self.find_for_facebook_oauth(auth)
    account_params = auth.slice(:provider, :uid)
    account_params.merge! auth.info.slice(:email, :first_name, :last_name)
    account_params[:facebook_picture_url] = auth.info.image
    account_params[:token] = auth.credentials.token
    account_params[:token_expiry] = Time.at(auth.credentials.expires_at)
    account_params = account_params.to_h

    account = Account.where(provider: auth.provider, uid: auth.uid).first
    account ||= Account.where(email: auth.info.email).first # User did a regular sign up in the past.
    if account
      account.update(account_params)
    else
      account = Account.new(account_params)
      account.password = Devise.friendly_token[0,20]  # Fake password for validation
      account.save
    end

    return account
  end

end
