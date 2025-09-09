"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuthGuard } from "@/hooks/useAuthGuard"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Sidebar from "@/components/Sidebar"
import { 
  LayoutDashboard, 
  Users, 
  Megaphone, 
  MessageSquare, 
  MessageCircle,
  Linkedin, 
  Settings, 
  Activity,
  UserCircle,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Clock,
  X,
  Trash2,
  CheckCircle,
  AlertCircle,
  PanelLeft,
  ExternalLink
} from "lucide-react"

// Mock data for leads with profile information for all users
const leadsData = [
  {
    id: 1,
    name: "Sunil Pal",
    subtitle: "Helping Fashion & Lifestyle Brands to Skyrocket their Revenues by over 50 million per month | Certified by Google & Flipkart Ads | D2C Marketing | Facebook Ads | Performance Marketing",
    avatar: "/api/placeholder/80/80",
    campaignName: "Social beat",
    activity: ["yellow", "yellow", "yellow"],
    status: "Pending Approval",
    statusType: "pending",
    company: "Digi Sidekick",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Sunil, I'm building consultative marketing solutions...",
        status: "completed",
        timestamp: "2 days ago"
      },
      {
        id: 2,
        type: "connection",
        title: "Connection Status",
        message: "Check connection status",
        status: "completed",
        timestamp: "1 day ago"
      },
      {
        id: 3,
        type: "acceptance",
        title: "Connection Acceptance Message",
        message: "Awesome to connect, Sunil! Allow me to introduce our services...",
        status: "completed",
        timestamp: "1 day ago"
      },
      {
        id: 4,
        type: "followup",
        title: "Follow-up 1",
        message: "Hey, did you get a chance to go through our proposal...",
        status: "completed",
        timestamp: "12 hours ago"
      },
      {
        id: 5,
        type: "replied",
        title: "Replied",
        message: "Thanks for reaching out. I'm interested in learning more...",
        status: "completed",
        timestamp: "6 hours ago"
      }
    ]
  },
  {
    id: 2,
    name: "Rimmi Agarwal",
    subtitle: "Social Media Manager | Content Creator | Digital Marketing Expert | Helping brands grow their online presence",
    avatar: "/api/placeholder/40/40",
    campaignName: "Social beat",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "Social Media Corp",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Rimmi, I'd love to connect and discuss social media strategies...",
        status: "completed",
        timestamp: "1 day ago"
      },
      {
        id: 2,
        type: "connection",
        title: "Connection Status",
        message: "Pending connection approval",
        status: "pending",
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: 3,
    name: "Darshana G",
    subtitle: "Senior Growth & Client Success Manager | B2B SaaS | Revenue Growth | Customer Success | Account Management",
    avatar: "/api/placeholder/40/40",
    campaignName: "Social beat",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "Growth Solutions",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Darshana, I'm reaching out to discuss growth opportunities...",
        status: "completed",
        timestamp: "2 hours ago"
      }
    ]
  },
  {
    id: 4,
    name: "Rahib Sachideva",
    subtitle: "Founder at Hatl! COO at BodyBuilding India | Fitness Entrepreneur | Business Development | Health & Wellness",
    avatar: "/api/placeholder/40/40",
    campaignName: "BodyBuilding India",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "BodyBuilding India",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Rahib, I'd like to connect and explore partnership opportunities...",
        status: "completed",
        timestamp: "3 hours ago"
      },
      {
        id: 2,
        type: "followup",
        title: "Follow-up 1",
        message: "Following up on my previous message about collaboration...",
        status: "completed",
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: 5,
    name: "sainath valgot",
    subtitle: "Operation Executive @ Big Flex | Operations Management | Process Improvement | Team Leadership",
    avatar: "/api/placeholder/40/40",
    campaignName: "Big Flex",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "Big Flex",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Sainath, I'd like to connect and discuss operational efficiency...",
        status: "completed",
        timestamp: "4 hours ago"
      }
    ]
  },
  {
    id: 6,
    name: "Arjun Kapoor",
    subtitle: "Sales Director at Big Flex | B2B Sales | Revenue Growth | Client Acquisition | Sales Strategy",
    avatar: "/api/placeholder/40/40",
    campaignName: "Big Flex",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "Big Flex",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Arjun, I'd love to connect and discuss sales opportunities...",
        status: "completed",
        timestamp: "2 hours ago"
      },
      {
        id: 2,
        type: "connection",
        title: "Connection Status",
        message: "Connection request sent",
        status: "pending",
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: 7,
    name: "Syed Fairoz Basha",
    subtitle: "Attended Jawaharlal Nehru Technological University | Software Engineer | Full Stack Developer | Tech Enthusiast",
    avatar: "/api/placeholder/40/40",
    campaignName: "Big Flex",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "JNT University",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Syed, I'd like to connect and discuss tech opportunities...",
        status: "completed",
        timestamp: "5 hours ago"
      }
    ]
  },
  {
    id: 8,
    name: "chaitanya vallepu",
    subtitle: "Business Development Executive | Client Relations | Market Research | Growth Strategy",
    avatar: "/api/placeholder/40/40",
    campaignName: "Benofic Nutrition",
    activity: ["yellow", "yellow", "yellow"],
    status: "Sent 1 hr ago",
    statusType: "sent",
    company: "Benofic Nutrition",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Chaitanya, I'd like to connect and explore business opportunities...",
        status: "completed",
        timestamp: "3 hours ago"
      }
    ]
  },
  {
    id: 9,
    name: "Sameer Pathan",
    subtitle: "Strategic Senior Operations Manager | Process Optimization | Team Management | Strategic Planning",
    avatar: "/api/placeholder/40/40",
    campaignName: "Be Me",
    activity: ["green", "green", "green"],
    status: "Connected 1 hr ago",
    statusType: "connected",
    company: "Be Me",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Sameer, I'd love to connect and discuss operational strategies...",
        status: "completed",
        timestamp: "2 days ago"
      },
      {
        id: 2,
        type: "connection",
        title: "Connection Status",
        message: "Connection accepted",
        status: "completed",
        timestamp: "1 day ago"
      },
      {
        id: 3,
        type: "acceptance",
        title: "Connection Acceptance Message",
        message: "Great to connect, Sameer! Looking forward to collaborating...",
        status: "completed",
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: 10,
    name: "Shubham Sharma",
    subtitle: "Ecommerce Specialist at BabyOrgano | Digital Marketing | E-commerce Strategy | Online Sales | Customer Acquisition",
    avatar: "/api/placeholder/40/40",
    campaignName: "BabyOrgano",
    activity: ["green", "green", "green"],
    status: "Connected 1 hr ago",
    statusType: "connected",
    company: "BabyOrgano",
    timeline: [
      {
        id: 1,
        type: "invitation",
        title: "Invitation Request",
        message: "Hi Shubham, I'd like to connect and discuss e-commerce opportunities...",
        status: "completed",
        timestamp: "3 days ago"
      },
      {
        id: 2,
        type: "connection",
        title: "Connection Status",
        message: "Connection accepted",
        status: "completed",
        timestamp: "2 days ago"
      },
      {
        id: 3,
        type: "acceptance",
        title: "Connection Acceptance Message",
        message: "Thanks for connecting! Excited to explore opportunities...",
        status: "completed",
        timestamp: "1 day ago"
      },
      {
        id: 4,
        type: "followup",
        title: "Follow-up 1",
        message: "Hope you're doing well! Wanted to follow up on our conversation...",
        status: "completed",
        timestamp: "1 hour ago"
      }
    ]
  }
]

const ActivityIndicator = ({ colors }: { colors: string[] }) => (
  <div className="flex space-x-1">
    {colors.map((color, index) => (
      <div
        key={index}
        className={`w-1 h-6 rounded-full ${
          color === "yellow" ? "bg-yellow-400" : "bg-green-400"
        }`}
      />
    ))}
  </div>
)

// Lead Profile Component
const LeadProfile = ({ lead, isOpen, onClose }: { 
  lead: any, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  const [isAdditionalInfoExpanded, setIsAdditionalInfoExpanded] = useState(false)
  
  if (!lead) return null

  // Generate different email addresses based on lead name
  const getEmailForLead = (name: string) => {
    const nameMap: { [key: string]: string } = {
      "Sunil Pal": "sunil.pal@gmail.com",
      "Rimmi Agarwal": "rimmi.agarwal@gmail.com", 
      "Darshana G": "darshana.g@gmail.com",
      "Rahib Sachideva": "rahib.sachideva@gmail.com",
      "sainath valgot": "sainath.valgot@gmail.com",
      "Arjun Kapoor": "arjun.kapoor@gmail.com",
      "Syed Fairoz Basha": "syed.fairoz@gmail.com",
      "chaitanya vallepu": "chaitanya.vallepu@gmail.com",
      "Sameer Pathan": "sameer.pathan@gmail.com",
      "Shubham Sharma": "shubham.sharma@gmail.com"
    }
    return nameMap[name] || "user@gmail.com"
  }

  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase()
  }

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "invitation":
      case "connection":
      case "acceptance":
      case "followup":
      case "replied":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[480px] sm:w-[540px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-gray-200">
            <SheetTitle className="text-lg font-semibold">Lead Profile</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            {/* Profile Card */}
            <div className="p-6 border-b border-gray-200">
              <Card className="p-6 bg-gray-50 border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={lead.avatar} />
                      <AvatarFallback className="bg-gray-300 text-gray-600">
                        {getInitials(lead.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {lead.name}
                        </h2>
                        <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                      </div>
                      <p className="text-sm text-gray-600">{getEmailForLead(lead.name)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  {lead.subtitle}
                </p>
              </Card>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <div className="space-y-6">
                {lead.timeline.map((item: any, index: number) => (
                  <div key={item.id} className="flex space-x-4">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div className="flex-shrink-0">
                        {getTimelineIcon(item.type)}
                      </div>
                      {index < lead.timeline.length - 1 && (
                        <div className="w-px h-12 bg-blue-200 mt-2"></div>
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium text-blue-600">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Message: {item.message}
                        {item.message.length > 30 && (
                          <button className="text-blue-500 hover:text-blue-600 ml-1 font-medium">
                            See More
                          </button>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">{item.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function LeadsPage() {
  // Protect this route - redirect to login if not authenticated
  useAuthGuard('/login');

  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isAdditionalProfileExpanded, setIsAdditionalProfileExpanded] = useState(false)

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead)
    setIsProfileOpen(true)
  }

  const handleCloseProfile = () => {
    setIsProfileOpen(false)
    setSelectedLead(null)
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden mr-4 mt-4 mb-4">
        {/* Header */}
        <div className="bg-white px-6 py-3 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <PanelLeft className="w-5 h-5 text-gray-600" />
              <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white rounded-b-lg shadow-md border border-gray-200 h-full overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-hide">
              <Table className="table-fixed w-full">
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow className="">
                    <TableHead className="font-medium text-gray-700 py-3 px-4 w-2/5">
                      <div className="flex items-center space-x-1">
                        <span>Name</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 py-3 px-4 w-1/5">
                      <div className="flex items-center space-x-1">
                        <span>Campaign Name</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 py-3 px-4 w-1/5">
                      <div className="flex items-center space-x-1">
                        <span>Activity</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                    <TableHead className="font-medium text-gray-700 py-3 px-4 w-1/5">
                      <div className="flex items-center space-x-1">
                        <span>Status</span>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
              {leadsData.map((lead) => (
                <TableRow 
                  key={lead.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  onClick={() => handleLeadClick(lead)}
                >
                  <TableCell className="py-3 px-4 w-2/5">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={lead.avatar} />
                        <AvatarFallback className="bg-gray-300 text-gray-600 text-sm">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {lead.name}
                        </p>
                        {lead.subtitle && (
                          <p className="text-xs text-gray-500 truncate">
                            {lead.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    <span className="text-sm text-gray-700 truncate block">{lead.campaignName}</span>
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    <div className="flex space-x-1">
                      {lead.status === "Pending Approval" ? (
                        <>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                        </>
                      ) : lead.status.includes("Sent") ? (
                        <>
                          <div className="w-1 h-4 bg-orange-400 rounded"></div>
                          <div className="w-1 h-4 bg-orange-400 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                        </>
                      ) : lead.status.includes("Followup") ? (
                        <>
                          <div className="w-1 h-4 bg-blue-500 rounded"></div>
                          <div className="w-1 h-4 bg-blue-500 rounded"></div>
                          <div className="w-1 h-4 bg-blue-500 rounded"></div>
                          <div className="w-1 h-4 bg-blue-500 rounded"></div>
                        </>
                      ) : lead.status === "Do Not Contact" ? (
                        <>
                          <div className="w-1 h-4 bg-red-500 rounded"></div>
                          <div className="w-1 h-4 bg-red-500 rounded"></div>
                          <div className="w-1 h-4 bg-red-500 rounded"></div>
                          <div className="w-1 h-4 bg-red-500 rounded"></div>
                        </>
                      ) : (
                        <>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                          <div className="w-1 h-4 bg-gray-300 rounded"></div>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4 w-1/5">
                    {lead.status === "Pending Approval" ? (
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs px-2 py-1">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending Approval
                      </Badge>
                    ) : lead.status.includes("Sent") ? (
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs px-2 py-1">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {lead.status}
                      </Badge>
                    ) : lead.status.includes("Followup") ? (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs px-2 py-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        {lead.status}
                      </Badge>
                    ) : lead.status === "Do Not Contact" ? (
                      <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs px-2 py-1">
                        <X className="w-3 h-3 mr-1" />
                        Do Not Contact
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs px-2 py-1">
                        {lead.status}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Profile Modal */}
      <LeadProfile 
        lead={selectedLead} 
        isOpen={isProfileOpen} 
        onClose={handleCloseProfile} 
      />
    </div>
  )
}
