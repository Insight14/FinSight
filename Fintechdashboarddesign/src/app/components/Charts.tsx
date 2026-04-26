import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'motion/react';

interface ChartsProps {
  trendData: Array<{ date: string; income: number; expenses: number }>;
  categoryData: Array<{ category: string; amount: number }>;
}

export function Charts({ trendData, categoryData }: ChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      <motion.div
        key="trend-chart"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#52664F]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A3F35" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#A0826D', fontSize: 12 }}
                axisLine={{ stroke: '#4A3F35' }}
              />
              <YAxis
                tick={{ fill: '#D4C5B9', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#4A3F35' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(42, 37, 32, 0.95)',
                  border: '1px solid rgba(82, 102, 79, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
                  backdropFilter: 'blur(12px)',
                  color: '#fff',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend
                wrapperStyle={{ paddingTop: '24px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#6B8268"
                strokeWidth={2}
                dot={{ fill: '#52664F', r: 3, strokeWidth: 1.5, stroke: '#3D4E3B' }}
                activeDot={{ r: 5 }}
                name="Income"
                id="income-line"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#8F5D51"
                strokeWidth={2}
                dot={{ fill: '#784338', r: 3, strokeWidth: 1.5, stroke: '#5D3329' }}
                activeDot={{ r: 5 }}
                name="Expenses"
                id="expenses-line"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        key="category-chart"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="bg-[#2A2520]/80 backdrop-blur-xl rounded-xl p-5 border border-[#784338]/20">
          <h3 className="text-lg font-semibold text-white mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A3F35" opacity={0.3} />
              <XAxis
                dataKey="category"
                tick={{ fill: '#A0826D', fontSize: 12 }}
                axisLine={{ stroke: '#4A3F35' }}
              />
              <YAxis
                tick={{ fill: '#D4C5B9', fontSize: 12, fontWeight: 600 }}
                axisLine={{ stroke: '#4A3F35' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(42, 37, 32, 0.95)',
                  border: '1px solid rgba(82, 102, 79, 0.2)',
                  borderRadius: '16px',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
                  backdropFilter: 'blur(12px)',
                  color: '#fff',
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
              />
              <Bar
                dataKey="amount"
                fill="#52664F"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
                id="category-bar"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
