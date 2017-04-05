class AddOmniauthToAccounts < ActiveRecord::Migration[5.0]
  def change
    add_column :accounts, :provider, :string
    add_column :accounts, :uid, :string
    add_column :accounts, :facebook_picture_url, :string
    add_column :accounts, :first_name, :string
    add_column :accounts, :last_name, :string
    add_column :accounts, :token, :string
    add_column :accounts, :token_expiry, :datetime
  end
end
