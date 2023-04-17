import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native';

type TextInputDropdownProps<T extends Record<string, string | number>> = {
  data: T[];
  filterBy: keyof T;
  placeholder?: string;
  setItemTitle?: (item: T) => JSX.Element | string;
  selectItem?: (item: T) => void;
};

export function TextInputDropdown<T extends Record<string, string | number>>({
  data,
  filterBy,
  placeholder,
  setItemTitle,
  selectItem,
}: TextInputDropdownProps<T>) {
  const [filterList, setFilterList] = useState(data || []);
  const [phrase, setPhrase] = useState('');

  useEffect(() => {
    if (!phrase) setFilterList(data || []);
  }, [phrase]);

  const filterRows = (value: string) => {
    let filterData =
      filterList && filterList?.length > 0
        ? filterList.filter(
            (data) =>
              data[filterBy].toString().indexOf(value?.toLowerCase()) !== -1
          )
        : [];

    setFilterList([...filterData]);
    setPhrase(value);
  };
  const handleSelect = (item: T) => {
    setPhrase(item[filterBy].toString());
    setFilterList([]);
    selectItem?.(item);
  };

  return (
    <>
      <TextInput
        value={phrase}
        placeholder={placeholder || 'Select...'}
        style={styles.input}
        onChangeText={filterRows}
      />
      <FlatList
        data={filterList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={styles.resultWrapper}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.resultText}>
              {setItemTitle?.(item) || item[filterBy]}
            </Text>
          </TouchableOpacity>
        )}
        style={{ maxHeight: 400, paddingHorizontal: 10 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderRadius: 12,
    padding: 10,
    margin: 10,
    backgroundColor: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
  resultWrapper: {
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
  },
  resultText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
