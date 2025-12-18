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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedShip, setSelectedShip] = useState<Ship | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredShips = ships.filter(ship => {
    const matchesEra = selectedEra === 'all' || ship.era === selectedEra;
    const matchesSearch = ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ship.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesSearch;
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
                  <h1 className="font-heading font-bold text-3xl md:text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Флот России
                  </h1>
                  <p className="text-sm text-muted-foreground">Интерактивный музей кораблей</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="font-heading font-bold text-5xl md:text-6xl mb-6 leading-tight">
              Исследуйте историю <br />
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                русского флота
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              От первых парусников Петра Великого до современных атомных крейсеров.
              Погрузитесь в 300 лет морской славы.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Поиск по названию или типу корабля..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base bg-card/50 backdrop-blur-sm border-border/50 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 border-t border-border/30 bg-card/20 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Clock" className="w-6 h-6 text-primary" />
              <h3 className="font-heading font-semibold text-2xl">Эпохи</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eras.map((era) => (
                <Button
                  key={era.id}
                  variant={selectedEra === era.id ? "default" : "outline"}
                  onClick={() => setSelectedEra(era.id)}
                  className={`h-auto p-6 flex flex-col items-start gap-2 transition-all duration-300 ${
                    selectedEra === era.id 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105' 
                      : 'hover:bg-muted/50 hover:scale-102 bg-card/50 border-border/50'
                  }`}
                >
                  <span className="text-3xl mb-1">{era.icon}</span>
                  <span className="font-heading font-semibold text-lg">{era.name}</span>
                  {era.period && (
                    <span className="text-xs opacity-80">{era.period}</span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Icon name="Ship" className="w-6 h-6 text-primary" />
                <h3 className="font-heading font-semibold text-2xl">
                  Коллекция кораблей
                </h3>
              </div>
              <span className="text-muted-foreground">
                Найдено: <span className="text-primary font-semibold">{filteredShips.length}</span>
              </span>
            </div>

            {filteredShips.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-flex p-6 rounded-full bg-muted/30 mb-4">
                  <Icon name="SearchX" className="w-12 h-12 text-muted-foreground" />
                </div>
                <h4 className="font-heading text-xl mb-2">Корабли не найдены</h4>
                <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShips.map((ship, index) => (
                  <div key={ship.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <ShipCard ship={ship} onClick={() => handleShipClick(ship)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-border/50 bg-card/20 backdrop-blur-sm py-8 px-4">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Icon name="Anchor" className="w-5 h-5 text-primary" />
              <span className="font-heading font-semibold text-lg">Флот России</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Интерактивный музей истории русского флота • 2025
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
