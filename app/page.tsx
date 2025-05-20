"use client"

import { useState } from "react"
import { Download, Copy, RefreshCw, FileDigit, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Generator() {
  const [count, setCount] = useState<number>(1)
  const [digitCount, setDigitCount] = useState<number>(9)
  const [numbers, setNumbers] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [uuidCount, setUuidCount] = useState<number>(3)
  const [uuids, setUuids] = useState<string[]>([])
  const [isGeneratingUuid, setIsGeneratingUuid] = useState<boolean>(false)

  const generateRandomNumbers = () => {
    setIsGenerating(true)

    const uniqueNumbers = new Set<string>()

    while (uniqueNumbers.size < count) {
      const prefix = Math.random() < 0.5 ? "00" : "0"
      const remainingDigitCount = digitCount - prefix.length
      let remainingDigits: string
      const maxNum = Math.pow(10, remainingDigitCount) - 1
      remainingDigits = Math.floor(Math.random() * maxNum)
        .toString()
        .padStart(remainingDigitCount, "0")

      const randomNumber = prefix + remainingDigits
      uniqueNumbers.add(randomNumber)
    }

    setNumbers(Array.from(uniqueNumbers))
    setIsGenerating(false)
  }

  const generateUUIDs = () => {
    setIsGeneratingUuid(true)

    const generatedUuids: string[] = []

    for (let i = 0; i < uuidCount; i++) {
      generatedUuids.push(generateUUID())
    }

    setUuids(generatedUuids)
    setIsGeneratingUuid(false)
  }

  const generateUUID = (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      const v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadAsFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
            File Number & UUID Generator
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">Generate unique file numbers and UUIDs</p>
        </header>

        <Tabs defaultValue="file-number" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-10">
            <TabsTrigger value="file-number" className="data-[state=active]:bg-purple-900/50">
              <FileDigit className="h-4 w-4 mr-2" />
              File Numbers
            </TabsTrigger>
            <TabsTrigger value="uuid" className="data-[state=active]:bg-purple-900/50">
              <Key className="h-4 w-4 mr-2" />
              UUID v4
            </TabsTrigger>
          </TabsList>

          <TabsContent value="file-number">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <Card className="shadow-xl border-0 bg-gray-800/80 backdrop-blur-sm h-full border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200">File Number Generator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="digitCount" className="text-sm font-medium text-gray-300">
                          Digit Length
                        </Label>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Slider
                          id="digitCount"
                          min={3}
                          max={20}
                          step={1}
                          value={[digitCount]}
                          onValueChange={(value) => setDigitCount(value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={digitCount}
                          onChange={(e) => setDigitCount(Number.parseInt(e.target.value) || 9)}
                          className="w-20 bg-gray-700 border-gray-600 text-gray-200"
                          min={3}
                          max={20}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="count" className="text-sm font-medium text-gray-300">
                          Quantity to generate
                        </Label>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Slider
                          id="count"
                          min={1}
                          max={1000}
                          step={1}
                          value={[count]}
                          onValueChange={(value) => setCount(value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={count}
                          onChange={(e) => setCount(Number.parseInt(e.target.value) || 1)}
                          className="w-20 bg-gray-700 border-gray-600 text-gray-200"
                          min={1}
                          max={1000}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={generateRandomNumbers}
                      className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl mt-4"
                      size="lg"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate File Numbers"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8">
                <Card className="shadow-xl border-0 bg-gray-800/80 backdrop-blur-sm h-full border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-200">Generated File Numbers</CardTitle>
                    {numbers.length > 0 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(numbers.join("\n"))}
                          title="Copy all"
                          className="hover:bg-gray-700 border-gray-700 text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => downloadAsFile(numbers.join("\n"), "file-numbers.txt")}
                          title="Download as file"
                          className="hover:bg-gray-700 border-gray-700 text-gray-300"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {numbers.length > 0 ? (
                      <div className="h-[calc(100vh-400px)] min-h-[300px] overflow-y-auto rounded-md border border-gray-700 bg-gray-900/50 p-4 custom-scrollbar">
                        <div className="font-mono text-sm">
                          {numbers.map((number, index) => (
                            <div
                              key={index}
                              className="py-2 border-b border-gray-800 flex justify-between group hover:bg-gray-800/50 px-2 rounded transition-colors"
                            >
                              <span className="text-gray-300">{number}</span>
                              <span className="text-gray-500 group-hover:text-purple-400 transition-colors">
                                #{index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-400px)] min-h-[300px]">
                        <FileDigit className="h-16 w-16 text-gray-700 mb-4" />
                        <h3 className="text-xl font-medium text-gray-400 mb-2">No Numbers Generated Yet</h3>
                        <p className="text-gray-500">
                          Configure the settings and click Generate to create file numbers
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="uuid">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <Card className="shadow-xl border-0 bg-gray-800/80 backdrop-blur-sm h-full border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-200">UUID v4 Generator</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="uuidCount" className="text-sm font-medium text-gray-300">
                          Quantity to generate
                        </Label>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Slider
                          id="uuidCount"
                          min={1}
                          max={1000}
                          step={1}
                          value={[uuidCount]}
                          onValueChange={(value) => setUuidCount(value[0])}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          value={uuidCount}
                          onChange={(e) => setUuidCount(Number.parseInt(e.target.value) || 3)}
                          className="w-20 bg-gray-700 border-gray-600 text-gray-200"
                          min={1}
                          max={1000}
                        />
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="rounded-md bg-gray-900 p-4 border border-gray-700">
                        <h3 className="text-sm font-medium text-gray-300 mb-2">About version 4 UUID</h3>
                        <p className="text-xs text-gray-400">
                          A Version 4 UUID is a universally unique identifier that is generated using random numbers. The Version 4 UUIDs produced by this site were generated using a secure random number generator.
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={generateUUIDs}
                      className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl mt-4"
                      size="lg"
                      disabled={isGeneratingUuid}
                    >
                      {isGeneratingUuid ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        "Generate UUIDs"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8">
                <Card className="shadow-xl border-0 bg-gray-800/80 backdrop-blur-sm h-full border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-gray-200">Generated UUIDs</CardTitle>
                    {uuids.length > 0 && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(uuids.join("\n"))}
                          title="Copy all"
                          className="hover:bg-gray-700 border-gray-700 text-gray-300"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => downloadAsFile(uuids.join("\n"), "uuids.txt")}
                          title="Download as file"
                          className="hover:bg-gray-700 border-gray-700 text-gray-300"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {uuids.length > 0 ? (
                      <div className="h-[calc(100vh-400px)] min-h-[300px] overflow-y-auto rounded-md border border-gray-700 bg-gray-900/50 p-4 custom-scrollbar">
                        <div className="font-mono text-sm">
                          {uuids.map((uuid, index) => (
                            <div
                              key={index}
                              className="py-2 border-b border-gray-800 flex justify-between group hover:bg-gray-800/50 px-2 rounded transition-colors"
                            >
                              <span className="text-gray-300">{uuid}</span>
                              <span className="text-gray-500 group-hover:text-purple-400 transition-colors">
                                #{index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-12 text-center h-[calc(100vh-400px)] min-h-[300px]">
                        <Key className="h-16 w-16 text-gray-700 mb-4" />
                        <h3 className="text-xl font-medium text-gray-400 mb-2">No UUIDs Generated Yet</h3>
                        <p className="text-gray-500">Configure the quantity and click Generate to create UUIDs</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Gaurav Borse. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
