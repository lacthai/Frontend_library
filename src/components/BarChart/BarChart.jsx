import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
        "country": "Monday",
        "hot dog": 170,
        "hot dogColor": "hsl(258, 70%, 50%)",
        "burger": 156,
        "burgerColor": "hsl(20, 70%, 50%)",
        "sandwich": 166,
        "sandwichColor": "hsl(329, 70%, 50%)",
        "kebab": 145,
        "kebabColor": "hsl(152, 70%, 50%)",
        "fries": 24,
        "friesColor": "hsl(92, 70%, 50%)",
        "donut": 154,
        "donutColor": "hsl(149, 70%, 50%)"
      },
      {
        "country": "Tuesday",
        "hot dog": 12,
        "hot dogColor": "hsl(209, 70%, 50%)",
        "burger": 108,
        "burgerColor": "hsl(67, 70%, 50%)",
        "sandwich": 182,
        "sandwichColor": "hsl(147, 70%, 50%)",
        "kebab": 129,
        "kebabColor": "hsl(235, 70%, 50%)",
        "fries": 121,
        "friesColor": "hsl(199, 70%, 50%)",
        "donut": 115,
        "donutColor": "hsl(352, 70%, 50%)"
      },
      {
        "country": "Wednesday",
        "hot dog": 81,
        "hot dogColor": "hsl(268, 70%, 50%)",
        "burger": 144,
        "burgerColor": "hsl(328, 70%, 50%)",
        "sandwich": 64,
        "sandwichColor": "hsl(132, 70%, 50%)",
        "kebab": 109,
        "kebabColor": "hsl(322, 70%, 50%)",
        "fries": 162,
        "friesColor": "hsl(196, 70%, 50%)",
        "donut": 13,
        "donutColor": "hsl(240, 70%, 50%)"
      },
      {
        "country": "Thursday",
        "hot dog": 7,
        "hot dogColor": "hsl(18, 70%, 50%)",
        "burger": 72,
        "burgerColor": "hsl(233, 70%, 50%)",
        "sandwich": 37,
        "sandwichColor": "hsl(169, 70%, 50%)",
        "kebab": 190,
        "kebabColor": "hsl(176, 70%, 50%)",
        "fries": 10,
        "friesColor": "hsl(179, 70%, 50%)",
        "donut": 131,
        "donutColor": "hsl(91, 70%, 50%)"
      },
      {
        "country": "Friday",
        "hot dog": 93,
        "hot dogColor": "hsl(218, 70%, 50%)",
        "burger": 169,
        "burgerColor": "hsl(57, 70%, 50%)",
        "sandwich": 100,
        "sandwichColor": "hsl(135, 70%, 50%)",
        "kebab": 14,
        "kebabColor": "hsl(1, 70%, 50%)",
        "fries": 11,
        "friesColor": "hsl(59, 70%, 50%)",
        "donut": 22,
        "donutColor": "hsl(44, 70%, 50%)"
      },
      {
        "country": "Saturday",
        "hot dog": 36,
        "hot dogColor": "hsl(330, 70%, 50%)",
        "burger": 25,
        "burgerColor": "hsl(1, 70%, 50%)",
        "sandwich": 167,
        "sandwichColor": "hsl(167, 70%, 50%)",
        "kebab": 134,
        "kebabColor": "hsl(241, 70%, 50%)",
        "fries": 144,
        "friesColor": "hsl(216, 70%, 50%)",
        "donut": 161,
        "donutColor": "hsl(213, 70%, 50%)"
      },
      {
        "country": "Sunday",
        "hot dog": 76,
        "hot dogColor": "hsl(265, 70%, 50%)",
        "burger": 182,
        "burgerColor": "hsl(311, 70%, 50%)",
        "sandwich": 164,
        "sandwichColor": "hsl(246, 70%, 50%)",
        "kebab": 167,
        "kebabColor": "hsl(110, 70%, 50%)",
        "fries": 141,
        "friesColor": "hsl(191, 70%, 50%)",
        "donut": 98,
        "donutColor": "hsl(84, 70%, 50%)"
      },
]


const BarChart = () => {
  return (
    <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
  )
}

export default BarChart