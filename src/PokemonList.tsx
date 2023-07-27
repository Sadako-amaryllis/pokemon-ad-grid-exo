import { useState } from 'react';
import { useGetPokemons, Pokemon } from './api/api';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PokemonDetails from './PokemonDetails';

const PokemonList = () => {
  const { data, isLoading, isError } = useGetPokemons();

  // État pour suivre le pokémon sélectionné
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // État pour gérer l'ouverture et la fermeture de la fenêtre modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Type', field: 'type', sortable: true, filter: true },
    { headerName: 'Sprite',
      field: 'sprites.front_default',
      cellRendererFramework: ({ value }: { value: string }) => (
        <img src={value} alt="Pokemon Sprite" style={{ width: '50px', height: '50px' }} />
      ),
    },
  ] as import('ag-grid-community').ColDef[];

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error while fetching data</div>;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
    <AgGridReact
      rowData={data}
      columnDefs={columnDefs}
      onCellClicked={(event) => handlePokemonClick(event.data as Pokemon)}
    />
    {selectedPokemon && (
      <PokemonDetails
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pokemon={selectedPokemon}
      />
    )}
  </div>
  );
};

export default PokemonList;
