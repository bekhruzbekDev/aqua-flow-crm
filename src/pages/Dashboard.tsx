import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Droplets, ShoppingCart, AlertTriangle, Clock, Users, TrendingUp } from 'lucide-react';
import { mockClients } from '@/shared/data/mockClients';
import { getDebtStatus, getBottleBalance } from '@/entities/client/types';
import { formatCurrency } from '@/shared/lib/format';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { mockOrders } from '@/shared/data/mockOrders';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const salesData = [
  { month: 'Yan', sotuvlar: 4200000, buyurtmalar: 32 },
  { month: 'Fev', sotuvlar: 5100000, buyurtmalar: 41 },
  { month: 'Mar', sotuvlar: 4800000, buyurtmalar: 38 },
  { month: 'Apr', sotuvlar: 6300000, buyurtmalar: 52 },
  { month: 'May', sotuvlar: 7100000, buyurtmalar: 58 },
  { month: 'Iyn', sotuvlar: 8500000, buyurtmalar: 67 },
  { month: 'Iyl', sotuvlar: 9200000, buyurtmalar: 74 },
  { month: 'Avg', sotuvlar: 8800000, buyurtmalar: 71 },
  { month: 'Sen', sotuvlar: 7600000, buyurtmalar: 62 },
  { month: 'Okt', sotuvlar: 6900000, buyurtmalar: 55 },
  { month: 'Noy', sotuvlar: 5400000, buyurtmalar: 44 },
  { month: 'Dek', sotuvlar: 6100000, buyurtmalar: 49 },
];

const chartConfig = {
  sotuvlar: {
    label: 'Sotuvlar',
    color: 'hsl(201 100% 36%)',
  },
};

const statusLabels: Record<string, string> = {
  pending: 'Kutilmoqda',
  in_progress: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi',
};

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function DashboardPage() {
  const totalDebt = mockClients
    .filter((c) => c.balance < 0)
    .reduce((sum, c) => sum + Math.abs(c.balance), 0);
  const totalBottlesOut = mockClients.reduce((sum, c) => sum + getBottleBalance(c), 0);
  const todayOrders = mockOrders.filter(o => o.createdAt.startsWith('2025-03')).length;
  const leadsCount = 12; // mock

  const recentOrders = mockOrders.slice(0, 5);

  const criticalDebtors = mockClients
    .filter((c) => c.balance < c.creditLimit)
    .sort((a, b) => a.balance - b.balance);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold tracking-tight">Bosh sahifa</h1>
        <p className="text-sm text-muted-foreground mt-1">Suv yetkazib berish operatsiyalari umumiy ko'rinishi</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Jami qarzdorlar', value: formatCurrency(totalDebt), icon: DollarSign, accent: 'text-destructive', bg: 'bg-destructive/10' },
          { label: 'Bugungi buyurtmalar', value: todayOrders.toString(), icon: ShoppingCart, accent: 'text-primary', bg: 'bg-accent' },
          { label: 'Lidlar soni', value: leadsCount.toString(), icon: TrendingUp, accent: 'text-primary', bg: 'bg-accent' },
          { label: 'Mijozlar soni', value: mockClients.length.toString(), icon: Users, accent: 'text-primary', bg: 'bg-accent' },
        ].map((kpi) => (
          <motion.div key={kpi.label} variants={item}>
            <Card className="rounded-2xl shadow-sm border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.accent}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="rounded-2xl shadow-sm border-border/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Savdo statistikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[280px] w-full">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(201 100% 36%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(201 100% 36%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(220 10% 46%)' }} />
                  <YAxis className="text-xs" tick={{ fill: 'hsl(220 10% 46%)' }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="sotuvlar"
                    stroke="hsl(201 100% 36%)"
                    strokeWidth={2}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Orders */}
        <motion.div variants={item}>
          <Card className="rounded-2xl shadow-sm border-border/60 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                Oxirgi buyurtmalar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentOrders.map((order) => {
                const client = mockClients.find(c => c.id === order.clientId);
                return (
                  <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{client?.name || 'Noma\'lum'}</p>
                      <p className="text-xs text-muted-foreground">{order.bottlesOrdered} dona · {formatCurrency(order.totalAmount)}</p>
                    </div>
                    <Badge variant="outline" className={`text-[10px] rounded-full px-2 py-0.5 shrink-0 ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Critical Debtors */}
      {criticalDebtors.length > 0 && (
        <motion.div variants={item}>
          <Card className="rounded-2xl shadow-sm border-border/60">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Muhim qarzdorlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {criticalDebtors.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10"
                  >
                    <div>
                      <p className="font-medium text-sm">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.company || c.region}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-destructive">{formatCurrency(c.balance)}</p>
                      <p className="text-[10px] text-muted-foreground">limit: {formatCurrency(c.creditLimit)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}