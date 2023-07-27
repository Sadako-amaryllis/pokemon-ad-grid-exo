import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Pokemon } from './api/api';
interface PokemonDetailsProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon; // Assurez-vous d'importer l'interface Pokemon du fichier api.ts
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ open, onClose, pokemon }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{pokemon.name}</DialogTitle>
      <DialogContent>
        <div>Type: {pokemon.type}</div>
        <div>Size : {pokemon.size}</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PokemonDetails;