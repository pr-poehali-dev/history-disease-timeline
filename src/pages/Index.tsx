import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { QRCodeSVG } from "qrcode.react";

interface Disease {
  id: string;
  name: string;
  year: number;
  period: string;
  deaths: string;
  affected: string;
  description: string;
  region: string;
  severity: "critical" | "high" | "moderate";
}

const diseases: Disease[] = [
  {
    id: "1",
    name: "Чума Юстиниана",
    year: 541,
    period: "541-549 гг.",
    deaths: "25-100 млн",
    affected: "Византийская империя",
    description: "Первая зарегистрированная пандемия чумы. Уничтожила до половины населения Византии и значительно ослабила империю.",
    region: "Средиземноморье, Европа, Азия",
    severity: "critical"
  },
  {
    id: "2",
    name: "Чёрная смерть",
    year: 1347,
    period: "1347-1353 гг.",
    deaths: "75-200 млн",
    affected: "Европа, Азия, Африка",
    description: "Самая разрушительная пандемия в истории человечества. Погибло от 30% до 60% населения Европы.",
    region: "Евразия, Северная Африка",
    severity: "critical"
  },
  {
    id: "3",
    name: "Оспа",
    year: 1520,
    period: "1520-1980 гг.",
    deaths: "300-500 млн",
    affected: "Весь мир",
    description: "Вирусное заболевание, которое опустошало человечество веками. Ликвидировано в 1980 году благодаря вакцинации.",
    region: "Весь мир",
    severity: "critical"
  },
  {
    id: "4",
    name: "Холера",
    year: 1817,
    period: "1817-настоящее время",
    deaths: "40+ млн",
    affected: "Весь мир",
    description: "Семь пандемий холеры. Остается проблемой в развивающихся странах с плохой санитарией.",
    region: "Индия, Азия, Африка, Европа",
    severity: "high"
  },
  {
    id: "5",
    name: "Испанский грипп",
    year: 1918,
    period: "1918-1920 гг.",
    deaths: "50-100 млн",
    affected: "500 млн",
    description: "Самая смертоносная пандемия гриппа в истории. Заразила треть населения планеты.",
    region: "Весь мир",
    severity: "critical"
  },
  {
    id: "6",
    name: "Азиатский грипп",
    year: 1957,
    period: "1957-1958 гг.",
    deaths: "1-2 млн",
    affected: "Весь мир",
    description: "Пандемия гриппа H2N2, начавшаяся в Китае и быстро распространившаяся по всему миру.",
    region: "Весь мир",
    severity: "high"
  },
  {
    id: "7",
    name: "ВИЧ/СПИД",
    year: 1981,
    period: "1981-настоящее время",
    deaths: "40+ млн",
    affected: "85+ млн",
    description: "Глобальная пандемия, вызванная вирусом иммунодефицита человека. Остается серьезной проблемой здравоохранения.",
    region: "Весь мир",
    severity: "critical"
  },
  {
    id: "8",
    name: "Атипичная пневмония (SARS)",
    year: 2002,
    period: "2002-2003 гг.",
    deaths: "774",
    affected: "8,098",
    description: "Первая серьезная и легко передающаяся болезнь XXI века. Была успешно локализована.",
    region: "Китай, Азия",
    severity: "moderate"
  },
  {
    id: "9",
    name: "Свиной грипп (H1N1)",
    year: 2009,
    period: "2009-2010 гг.",
    deaths: "150-575 тыс",
    affected: "700 млн - 1.4 млрд",
    description: "Пандемия гриппа, вызванная новым штаммом H1N1. Поразила более 10% населения планеты.",
    region: "Весь мир",
    severity: "high"
  },
  {
    id: "10",
    name: "Эбола",
    year: 2014,
    period: "2014-2016 гг.",
    deaths: "11,323",
    affected: "28,616",
    description: "Крупнейшая вспышка лихорадки Эбола в истории. Высокая летальность до 50%.",
    region: "Западная Африка",
    severity: "high"
  },
  {
    id: "11",
    name: "COVID-19",
    year: 2019,
    period: "2019-настоящее время",
    deaths: "7+ млн",
    affected: "770+ млн",
    description: "Пандемия коронавирусной инфекции, вызвавшая глобальный кризис здравоохранения и экономики.",
    region: "Весь мир",
    severity: "critical"
  }
];

const Index = () => {
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [filterCentury, setFilterCentury] = useState<string>("all");
  const currentUrl = window.location.href;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50";
      case "moderate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Критический";
      case "high":
        return "Высокий";
      case "moderate":
        return "Умеренный";
      default:
        return "Неизвестно";
    }
  };

  const getCentury = (year: number) => {
    return Math.ceil(year / 100);
  };

  const filteredDiseases = filterCentury === "all" 
    ? diseases 
    : diseases.filter(d => getCentury(d.year).toString() === filterCentury);

  const centuries = Array.from(new Set(diseases.map(d => getCentury(d.year)))).sort();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <header className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon name="Activity" size={40} className="text-primary" />
            <h1 className="text-5xl font-bold font-['Montserrat']">
              История Эпидемий
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-['Roboto'] mb-6">
            Хроника самых разрушительных болезней в истории человечества — от древних времён до наших дней
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-['Roboto'] font-medium">
                <Icon name="QrCode" size={20} />
                Показать QR-код
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-['Montserrat'] text-2xl">QR-код сайта</DialogTitle>
                <DialogDescription className="font-['Roboto']">
                  Отсканируйте этот код для быстрого доступа с мобильного устройства
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-white p-6 rounded-lg">
                  <QRCodeSVG
                    value={currentUrl}
                    size={256}
                    level="H"
                    includeMargin={true}
                    fgColor="#1A1F2C"
                  />
                </div>
                <p className="text-sm text-muted-foreground font-['Roboto'] text-center max-w-xs">
                  {currentUrl}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFilterCentury("all")}
            className={`px-4 py-2 rounded-lg font-['Roboto'] transition-all ${
              filterCentury === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground hover:bg-muted"
            }`}
          >
            Все века
          </button>
          {centuries.map((century) => (
            <button
              key={century}
              onClick={() => setFilterCentury(century.toString())}
              className={`px-4 py-2 rounded-lg font-['Roboto'] transition-all ${
                filterCentury === century.toString()
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground hover:bg-muted"
              }`}
            >
              {century} век
            </button>
          ))}
        </div>

        <div className="grid gap-6 mb-12">
          {filteredDiseases.map((disease, index) => (
            <Card
              key={disease.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border-2 ${
                selectedDisease?.id === disease.id
                  ? "border-primary shadow-2xl"
                  : "border-border"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fade-in 0.5s ease-out forwards",
              }}
              onClick={() =>
                setSelectedDisease(
                  selectedDisease?.id === disease.id ? null : disease
                )
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Skull" size={24} className="text-destructive" />
                      <CardTitle className="text-2xl font-['Montserrat']">
                        {disease.name}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base font-['Roboto']">
                      {disease.period} • {disease.region}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getSeverityColor(
                      disease.severity
                    )} px-3 py-1 text-sm font-['Roboto']`}
                  >
                    {getSeverityLabel(disease.severity)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-4">
                  <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                    <Icon name="Users" size={24} className="text-secondary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-['Roboto']">
                        Жертвы
                      </p>
                      <p className="text-lg font-semibold font-['Roboto']">
                        {disease.deaths}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg">
                    <Icon name="Globe" size={24} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground font-['Roboto']">
                        Заражено
                      </p>
                      <p className="text-lg font-semibold font-['Roboto']">
                        {disease.affected}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedDisease?.id === disease.id && (
                  <div className="animate-accordion-down">
                    <Separator className="my-4" />
                    <p className="text-muted-foreground leading-relaxed font-['Roboto']">
                      {disease.description}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground font-['Roboto']">
                    <Icon name="Calendar" size={16} />
                    <span>Начало: {disease.year} год</span>
                  </div>
                  <Icon
                    name={selectedDisease?.id === disease.id ? "ChevronUp" : "ChevronDown"}
                    size={20}
                    className="text-primary"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/50 border-2">
          <CardHeader>
            <CardTitle className="text-3xl font-['Montserrat'] flex items-center gap-3">
              <Icon name="BarChart3" size={32} className="text-primary" />
              Статистика по тяжести
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-500/10 border-2 border-red-500/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="AlertTriangle" size={28} className="text-red-400" />
                  <h3 className="text-xl font-semibold text-red-400 font-['Montserrat']">
                    Критический
                  </h3>
                </div>
                <p className="text-4xl font-bold text-red-400 mb-2 font-['Montserrat']">
                  {diseases.filter((d) => d.severity === "critical").length}
                </p>
                <p className="text-sm text-red-300 font-['Roboto']">
                  эпидемий с катастрофическими последствиями
                </p>
              </div>

              <div className="bg-orange-500/10 border-2 border-orange-500/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="AlertCircle" size={28} className="text-orange-400" />
                  <h3 className="text-xl font-semibold text-orange-400 font-['Montserrat']">
                    Высокий
                  </h3>
                </div>
                <p className="text-4xl font-bold text-orange-400 mb-2 font-['Montserrat']">
                  {diseases.filter((d) => d.severity === "high").length}
                </p>
                <p className="text-sm text-orange-300 font-['Roboto']">
                  эпидемий со значительным воздействием
                </p>
              </div>

              <div className="bg-yellow-500/10 border-2 border-yellow-500/50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Info" size={28} className="text-yellow-400" />
                  <h3 className="text-xl font-semibold text-yellow-400 font-['Montserrat']">
                    Умеренный
                  </h3>
                </div>
                <p className="text-4xl font-bold text-yellow-400 mb-2 font-['Montserrat']">
                  {diseases.filter((d) => d.severity === "moderate").length}
                </p>
                <p className="text-sm text-yellow-300 font-['Roboto']">
                  эпидемий с контролируемым распространением
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <footer className="mt-16 text-center text-muted-foreground font-['Roboto']">
          <p>
            Данные собраны из исторических источников и медицинских исследований
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;