import { HeroCarousel } from '../components/HeroCarousel';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <HeroCarousel />
      
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Fashion That Empowers
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            TS Gabrielle Fashion celebrates the beauty, strength, and authenticity of transwomen through bold, artistic designs that push boundaries and redefine style.
          </p>
          <Button
            size="lg"
            className="bg-[#a932bd] hover:bg-[#8a2a9d] text-white font-bold text-lg px-8 py-6 rounded-full"
            onClick={() => navigate({ to: '/products' })}
          >
            Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#a932bd]/10 to-transparent border border-[#a932bd]/20">
              <div className="text-5xl font-black text-[#a932bd] mb-4">01</div>
              <h3 className="text-xl font-bold mb-3">Vanguardist Design</h3>
              <p className="text-muted-foreground">
                Cutting-edge fashion that breaks conventions and celebrates individuality.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#a932bd]/10 to-transparent border border-[#a932bd]/20">
              <div className="text-5xl font-black text-[#a932bd] mb-4">02</div>
              <h3 className="text-xl font-bold mb-3">Artistic Expression</h3>
              <p className="text-muted-foreground">
                Every piece is a work of art, designed to make you feel confident and beautiful.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-[#a932bd]/10 to-transparent border border-[#a932bd]/20">
              <div className="text-5xl font-black text-[#a932bd] mb-4">03</div>
              <h3 className="text-xl font-bold mb-3">Inclusive Fashion</h3>
              <p className="text-muted-foreground">
                Created with love for transwomen, by designers who understand and celebrate you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
