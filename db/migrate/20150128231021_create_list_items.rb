class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.string  :title,   null: false
      t.text    :details, null: false
      t.integer :position

      t.timestamps null: false
    end
  end
end
