import { Ship } from '@/data/ships';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ShipCardProps {
  ship: Ship;
  onClick: () => void;
}

const ShipCard = ({ ship, onClick }: ShipCardProps) => {
  const eraLabels = {
    ancient: 'Древняя Русь',
    medieval: 'Средневековье',
    prePetrine: 'До Петра I'
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in bg-card/50 backdrop-blur-sm border-border/50"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          <img 
            src={ship.images[0]} 
            alt={ship.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
            {eraLabels[ship.era]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
            {ship.name}
          </h3>
          <span className="text-sm text-muted-foreground font-medium ml-2">
            {ship.year}
          </span>
        </div>
        
        <p className="text-sm text-primary/80 font-medium mb-3">{ship.type}</p>
        
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {ship.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex items-center gap-2 text-primary">
        <span className="text-sm font-medium">Подробнее</span>
        <Icon name="ArrowRight" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </CardFooter>
    </Card>
  );
};

export default ShipCard;