import { useQuery } from '@tanstack/react-query'
import { PublicAxios } from '../utils/axiosConfig/axiosConfig'
const user_ID = '694da85b653446a1a6264c21'


export const useGetUser = () => {
  const {
    data: dashboardData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await PublicAxios.get('/users')
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return { dashboardData, isLoading, refetch }
}


export const useGetDailyLogs = () => {
  const {
    data: DailyLogs,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['logs'],
    queryFn: async () => {
      const response = await PublicAxios.get(`daily-logs?userId=${user_ID}`)
      return response.data
    },
    refetchOnWindowFocus: false,
  })

  return { DailyLogs, isLoading, refetch }
}



