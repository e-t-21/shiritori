class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string     :name, null: false
      t.string     :back_name1
      t.string     :back_name2
      t.string     :back_name3
      t.timestamps
    end
  end
end