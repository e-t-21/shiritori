class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string     :name, null: false
      t.string     :name_kana, null: false
      t.string     :back_name1
      t.string     :back_name1_kana
      t.string     :back_name2
      t.string     :back_name2_kana
      t.string     :back_name3
      t.string     :back_name3_kana
      t.string     :back_name4
      t.string     :back_name4_kana
      t.timestamps
    end

    reversible do |dir|
      dir.up do
        execute <<-SQL
          ALTER TABLE words
          ADD CONSTRAINT check_back_names
          CHECK (
            (back_name1 IS NULL AND back_name1_kana IS NULL) OR
            (back_name1 IS NOT NULL AND back_name1_kana IS NOT NULL)
          ) AND (
            (back_name2 IS NULL AND back_name2_kana IS NULL) OR
            (back_name2 IS NOT NULL AND back_name2_kana IS NOT NULL)
          ) AND (
            (back_name3 IS NULL AND back_name3_kana IS NULL) OR
            (back_name3 IS NOT NULL AND back_name3_kana IS NOT NULL)
          ) AND (
            (back_name4 IS NULL AND back_name4_kana IS NULL) OR
            (back_name4 IS NOT NULL AND back_name4_kana IS NOT NULL)
          );
        SQL
      end

      dir.down do
        execute <<-SQL
          ALTER TABLE words
          DROP CONSTRAINT IF EXISTS check_back_names;
        SQL
      end
    end
  end
end