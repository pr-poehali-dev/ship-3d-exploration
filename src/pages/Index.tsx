import { useState } from 'react';
import { ships, eras } from '@/data/ships';
import ShipCard from '@/components/ShipCard';
import ShipDetail from '@/components/ShipDetail';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Ship } from '@/data/ships';

const Index = () => {
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredShips = ships.filter(ship => {
    const matchesEra = selectedEra === 'all' || ship.era === selectedEra;
    return matchesEra;
  });

  const handleShipClick = (ship: Ship) => {
    setSelectedShip(ship);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        
        <header className="relative border-b border-border/50 backdrop-blur-xl bg-card/30">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                  <Icon name="Anchor" className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="font-heading font-bold text-3xl md:text-4xl text-primary">
                    Корабли.ру
                  </h1>
                  <p className="text-sm text-muted-foreground">Древнерусское судостроение</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6 leading-tight text-foreground">
              Древнерусские корабли <br />
              <span className="text-primary">
                IX-XVII веков
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              От ладей викингов до первых военных кораблей царя Алексея Михайловича.
              Путешествие в историю допетровского флота.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShips.map((ship, index) => (
                <div key={ship.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ShipCard ship={ship} onClick={() => handleShipClick(ship)} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4 border-t border-border">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Icon name="Clock" className="w-6 h-6 text-primary" />
              <h3 className="font-heading font-semibold text-2xl text-foreground">Фильтр по эпохам</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {eras.map((era) => (
                <Button
                  key={era.id}
                  variant={selectedEra === era.id ? "default" : "outline"}
                  onClick={() => setSelectedEra(era.id)}
                  className={`h-auto px-6 py-4 flex items-center gap-3 transition-all duration-300 ${
                    selectedEra === era.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                      : 'hover:bg-muted border-2'
                  }`}
                >
                  <span className="text-2xl">{era.icon}</span>
                  <div className="text-left">
                    <div className="font-heading font-semibold">{era.name}</div>
                    {era.period && (
                      <div className="text-xs opacity-80">{era.period}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-8 px-4 bg-card">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="Anchor" className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold text-lg text-foreground">Корабли.ру</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Древнерусское судостроение IX-XVII веков • 2025
            </p>
          </div>
        </footer>
      </div>

      <ShipDetail 
        ship={selectedShip} 
        open={detailOpen} 
        onClose={() => setDetailOpen(false)} 
      />
    </div>
  );
};

export default Index;