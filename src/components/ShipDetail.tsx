import { Ship } from '@/data/ships';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface ShipDetailProps {
  ship: Ship | null;
  open: boolean;
  onClose: () => void;
}

const ShipDetail = ({ ship, open, onClose }: ShipDetailProps) => {
  if (!ship) return null;

  const eraLabels = {
    ancient: 'Древняя Русь',
    medieval: 'Средневековье',
    prePetrine: 'До Петра I'
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="font-heading text-3xl mb-2">{ship.name}</DialogTitle>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="text-lg font-medium text-primary">{ship.type}</span>
                <span>•</span>
                <span className="text-lg">{ship.year} год</span>
              </div>
            </div>
            <Badge className="bg-primary/90 text-base px-4 py-1">
              {eraLabels[ship.era]}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="p-6 space-y-6">
            <div className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <img 
                src={ship.images[0]} 
                alt={ship.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div>
              <h4 className="font-heading font-semibold text-xl mb-3 flex items-center gap-2">
                <Icon name="BookOpen" className="w-5 h-5 text-primary" />
                История
              </h4>
              <p className="text-muted-foreground leading-relaxed text-base">
                {ship.description}
              </p>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h4 className="font-heading font-semibold text-xl mb-4 flex items-center gap-2">
                <Icon name="Ruler" className="w-5 h-5 text-primary" />
                Технические характеристики
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon name="Maximize2" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Длина</p>
                    <p className="font-semibold text-foreground">{ship.specs.length}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon name="Weight" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Водоизмещение</p>
                    <p className="font-semibold text-foreground">{ship.specs.displacement}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon name="Users" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Экипаж</p>
                    <p className="font-semibold text-foreground">{ship.specs.crew}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon name="Swords" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Вооружение</p>
                    <p className="font-semibold text-foreground">{ship.specs.armament}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ShipDetail;