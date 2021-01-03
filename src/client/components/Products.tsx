/* eslint-disable require-jsdoc */
import autobind from 'autobind-decorator';
import React from 'react';

export interface Props {
}

interface Item {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

interface SearchValues {
  searchText: string;
  restictToStockedItems: boolean;
}

interface SearchBarProps {
  searchValues: SearchValues;
  onSearchTextChange: (text: string) => void;
  onStockedItemFilterChange: (restrictToStocked: boolean) => void
}

class SearchBar extends React.Component<SearchBarProps> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      items: [] as Item[],
    };
  }

  @autobind
  onSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onSearchTextChange(event.target.value);
  }

  @autobind
  onStockedItemsFilterCahnge(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onStockedItemFilterChange(event.target.checked);
  }

  render(): React.ReactNode {
    return (
      <div className="search-bar">
        <form>
          <label> Search products:
            <input type="text" onChange={this.onSearchTextChange} />
          </label>
          <label> Stocked only:
            <input type="checkbox" onChange={this.onStockedItemsFilterCahnge} />
          </label>
        </form>
      </div>
    );
  }
}

interface ItemTableState {
  items: Item[];
}

class ItemTable extends React.Component<SearchValues, ItemTableState> {
  constructor(props: SearchValues) {
    super(props);
    this.state = {
      items: [] as Item[],
    };
  }

  componentDidMount() {
    fetch('api/products')
        .then((res) => res.json())
        .then(
            (response) => {
              this.setState({items: response.result as Item[]});
            },
            (error) => {
              console.error(error);
            });
  }

  render(): React.ReactNode {
    const {restictToStockedItems, searchText} = this.props;

    const filteredItems: Item[] =
        this.state.items.filter((item) => {
          return !restictToStockedItems || item.stocked;
        }).filter((item) => {
          return !searchText || item.name.includes(searchText);
        });

    const productRows: React.ReactNode[] = filteredItems.map((item) => {
      return (
        <tr key={item.name}>
          <td>{item.name}</td>
          <td>{item.price}</td>
        </tr>
      );
    });

    return (
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    );
  }
}

export class Products extends React.Component<Props, SearchValues> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchText: '',
      restictToStockedItems: false,
    };
  }

  @autobind
  setSearchText(text: string) {
    this.setState({searchText: text});
  }

  @autobind
  setStockedItemsOnly(stockedOnly: boolean) {
    this.setState({restictToStockedItems: stockedOnly});
  }

  render(): React.ReactNode {
    const {searchText, restictToStockedItems} = this.state;
    return (
      <div className="my-products">
        Products!
        <SearchBar
          searchValues={this.state}
          onSearchTextChange={this.setSearchText}
          onStockedItemFilterChange={this.setStockedItemsOnly} />
        <ItemTable
          searchText={searchText}
          restictToStockedItems={restictToStockedItems} />
      </div>
    );
  }
}
